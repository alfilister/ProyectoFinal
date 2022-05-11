const { Router } = require("express")
const {
  getApiInfo,
  chargeProductsDb,
  postProduct,
  getProductsDb,
  searchProductById,
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

router.get("/info", async (req, res, next) => {
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

router.get("/:id", async (req, res, next) => {
  try {
    const response = await searchProductById(req.params.id)
    res.json({
      status: "Found",
      data: response,
    })
  } catch (error) {
    next(error)
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
