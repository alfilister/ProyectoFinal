const { Router } = require("express")
const { getReview } = require("../controllers")
const { Review } = require("../db")

const router = Router()

router.get("/", async (req, res, next) => {
  try {
    res.send(getReview())
  } catch (err) {
    next(err)
  }
})

router.post('', async (req, res, next) => {
  const {user_id, product_id, product_review} = req.body;
  try {
    Review.create({
      product_review,
      product_id,
      user_id
    })
  } catch (error) {
    console.log(error)
  }
})

module.exports = router
