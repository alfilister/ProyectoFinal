const { Router } = require("express");
const categoryRoute = require("./category");
const productRoute = require("./product");
const reviewRoute = require("./review");
const userRoute = require("./user");
const orderRoute = require("./order");

const router = Router();

router.use("/categories", categoryRoute);
router.use("/products", productRoute);
router.use("/reviews", reviewRoute);
router.use("/users", userRoute);
router.use("/orders", orderRoute);

module.exports = router;
