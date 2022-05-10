const { Router } = require("express")
const { getApiInfo } = require("../controllers")

const router = Router()

router.get("/", async (req, res, next) => {
  try {
    const result = await getApiInfo()
    res.json({
      status: "Api info loaded",
      data: result,
    })
  } catch (err) {
    next(err)
  }
})

module.exports = router