const { Router } = require("express")
const { getCategory } = require("../controllers")

const router = Router()

router.get("/", async (req, res, next) => {
  try {
    const categories = await getCategory()

    res.json({
      status: "api info loaded",
      data: categories,
    })
  } catch (err) {
    next(err)
  }
})

module.exports = router
