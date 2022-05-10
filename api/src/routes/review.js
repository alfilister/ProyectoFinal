const { Router } = require("express")
const { getReview } = require("../controllers")

const router = Router()

router.get("/", async (req, res, next) => {
  try {
    res.send(getReview())
  } catch (err) {
    next(err)
  }
})

module.exports = router
