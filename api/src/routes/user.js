const { Router } = require("express")
const { getUser } = require("../controllers")

const router = Router()

router.get("/", async (req, res, next) => {
  try {
    res.send(getUser())
  } catch (err) {
    next(err)
  }
})

module.exports = router
