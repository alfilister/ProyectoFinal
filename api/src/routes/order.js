const { Router } = require("express")
const orderController = require("../controllers/order")

const router = Router()

router.get("/", async (req, res, next) => {
  try {
    const info = await orderController.getAllOrders()

    res.json({
      status: "Orders info loaded",
      quantity_found: info.length,
      results: info,
    })
  } catch (error) {
    next(error)
  }
})

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params
    const info = await orderController.getOrderById(id)

    if (info === null) {
      res.send("id not found")
    } else {
      res.json({
        status: "Order Found",
        results: info,
      })
    }
  } catch (error) {
    next(error)
  }
})

router.post("/", async (req, res, next) => {
  try {
    const orderPost = await orderController.postOrder(req.body)
    console.log(orderPost)
    res.status(201).json({
      status: "Product succesfully reated",
      results: orderPost,
    })
  } catch (err) {
    next(err)
  }
})

router.put("/:idOrder", async (req, res, next) => {
  const { idOrder } = req.params

  try {
    const updated = await orderController.updateOrder(idOrder, req.body)
    res.json({ results: updated })
  } catch (error) {
    next(error)
  }
})

module.exports = router
