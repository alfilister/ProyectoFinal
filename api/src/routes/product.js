const { Router } = require("express")
const { getApiInfo, chargeProductsDb } = require("../controllers")

const router = Router()

router.get("/", async (req, res, next) => {
  try {
    const result = await getApiInfo()
    await chargeProductsDb(result)
    res.json({
      status: "Api info loaded",
      data: result,
    })
  } catch (err) {
    next(err)
  }
})

module.exports = router
