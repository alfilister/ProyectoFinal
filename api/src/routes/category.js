const { Router } = require("express")
const { getCategory } = require("../controllers")

const router = Router()

router.get("/", async (req, res, next) => {
  try {
    res.send(getCategory())
  } catch (err) {
    next(err)
  }
})

module.exports = router
