const { Router } = require("express")
const { getUser } = require("../controllers")
const { User } = require("../db")

const router = Router()

router.get("/", async (req, res, next) => {
  try {
    res.send(getUser())
  } catch (err) {
    next(err)
  }
})

router.post("/", async (req, res, next) => {
  const mockUsers = ["Juan", "Pedro", "Mafalda", "Cristobal"]
  try {
    mockUsers.map(async (el) => await User.create({ fullName: el }))

    res.send("OK makey")
  } catch (err) {
    next(err)
  }
})

module.exports = router
