const { Router } = require("express");
const orderController = require("../controllers/order");
const Stripe = require("stripe");

const stripe = new Stripe(
	"sk_test_51L1HPsAYXX7Bavv4iws7hZOcMDqtqYRHrxJ9DdhIzna0QujApSBPEu9jJz5kckK5uVu1bhhuBDI52LDLLXgQ9Vu000ehqFx7oI"
);

const router = Router();

router.get("/", async (req, res, next) => {
	try {
		const info = await orderController.getAllOrders();

		res.json({
			status: "Orders info loaded",
			// quantity_found: info.length,
			results: info,
		});
	} catch (error) {
		next(error);
	}
});

router.get("/:id", async (req, res, next) => {
	try {
		const { id } = req.params;
		const info = await orderController.getOrderById(id);

		if (info === null) {
			res.send("id not found");
		} else {
			res.json({
				status: "Order Found",
				results: info,
			});
		}
	} catch (error) {
		next(error);
	}
});

router.post("/", async (req, res, next) => {
	try {
		const orderPost = await orderController.postOrder(req.body);

		res.status(201).json({
			status: "Product succesfully reated",
			results: orderPost,
		});
	} catch (err) {
		next(err);
	}
});

router.put("/:idOrder", async (req, res, next) => {
	const { idOrder } = req.params;

	try {
		const updated = await orderController.updateOrder(idOrder, req.body);
		res.json({ results: updated });
	} catch (error) {
		next(error);
	}
});

router.post("/checkout", async (req, res, next) => {
	try {
		const { id, amount, order_id } = req.body;

		const payment = await stripe.paymentIntents.create({
			amount,
			currency: "USD",
			description: "Order placed in e-commercell",
			payment_method: id,
			confirm: true,
		});

		res.json({
			status: "payment recieved",
			payment_id: payment.id,
			order_id: order_id,
		});
	} catch (error) {
		res.json({ status: "payment rejected", message: error });
	}
});

module.exports = router;
