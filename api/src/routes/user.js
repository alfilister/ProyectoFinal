const { Router } = require("express")
const userController = require("../controllers/user")
const { User } = require("../db")

const router = Router()

router.get("/", async (req, res, next) => {
  try {
    res.json({
      status: "Users loaded",
      results: await userController.getUser(),
    })
  } catch (err) {
    next(err)
  }
})

router.post("/", async (req, res, next) => {
  const { user } = req.body
  try {
    res.json({
      status: "Users created",
      results: await userController.postUser( user ),
    })
  } catch (err) {
    next(err)
  }
})

module.exports = router
