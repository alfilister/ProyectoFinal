const { Router } = require("express")
const { getReview } = require("../controllers")
const { Review } = require("../db")

const router = Router()


//TRAER REVIEWS DE LA BASE DE DATOS
router.get("/", async (req, res, next) => {
  try {
    res.send( await getReview())
  } catch (err) {
    next(err)
  }
})


//GUARDAR REVIEWS
router.post('', async (req, res, next) => {
  const {user_id, product_id, product_review} = req.body;
  try {
    const review = await Review.create({
      product_review,
      product_id,
      user_id
    })
    res.send(review);
  } catch (error) {
    console.log(error)
  }
})

//EDITAR REVIEW
router.update

module.exports = router
