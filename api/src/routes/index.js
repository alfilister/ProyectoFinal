const { Router } = require("express")
const categoryRoute = require("./category")
const productRoute = require("./product")
const reviewRoute = require("./review")
const userRoute = require("./user")

const router = Router()

router.use("/category", categoryRoute)
router.use("/product", productRoute)
router.use("/review", reviewRoute)
router.use("/user", userRoute)

module.exports = router
