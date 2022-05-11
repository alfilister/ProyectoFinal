const { Router } = require("express")
const {
  getApiInfo,
  chargeProductsDb,
  postProduct,
  getProductsDb,
} = require("../controllers")
const { Category, Product, Review, User } = require("../db")

const router = Router()

router.get("/", async (req, res, next) => {
  try {
    const result = await getApiInfo()
    const dataDb = await chargeProductsDb(result)

    res.json({
      status: "Api info loaded",
      data: dataDb,
    })
  } catch (err) {
    next(err)
  }
})

router.get("/test", async (req, res, next) => {
  try {
    const dataDb = await getProductsDb()

    res.json({
      status: "Api info loaded",
      data: dataDb,
    })
  } catch (err) {
    next(err)
  }
})

router.post("/", async (req, res, next) => {
  try {
    const productCreate = await postProduct(req.body)
    res.status(201).json({
      status: "Product succesfully reated",
      dataProvided: productCreate,
    })
  } catch (err) {
    next(err)
  }
})

module.exports = router
