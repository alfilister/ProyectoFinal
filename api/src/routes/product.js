const { Router } = require("express")
const { getProduct } = require("../controllers")

const router = Router()

router.get("/", async (req, res, next) => {
  try {
    res.send(getProduct())
  } catch (err) {
    next(err)
  }
})

module.exports = router
