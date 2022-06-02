const { Router } = require("express");
const reviewController = require("../controllers/review");

const router = Router();

//TRAER REVIEWS DE LA BASE DE DATOS POR PRODUCTO
router.get("/product", async (req, res, next) => {
  try {
    res.send(await reviewController.getReviewByProduct());
  } catch (err) {
    next(err);
  }
});

//TRAER REVIEWS DE LA BASE DE DATOS POR USUARIO
router.get("/user", async (req, res, next) => {
  try {
    res.send(await reviewController.getReviewByUser());
  } catch (err) {
    next(err);
  }
});

//GUARDAR REVIEWS
router.post("/", async (req, res, next) => {
  const { user_id, product_id, product_review, score_review } = req.body;
  try {
    res.send(
      await reviewController.setReview(
        user_id,
        product_id,
        product_review,
        score_review
      )
    );
  } catch (error) {
    next(error);
  }
});

//EDITAR REVIEW
router.put("/", async (req, res, next) => {
  const { id, product_review, score_review } = req.body;
  try {
    res.send(
      await reviewController.updateReview(id, product_review, score_review)
    );
  } catch (error) {
    next(error);
  }
});

//ELIMINAR REVIEW
router.delete("/", async (req, res, next) => {
  const { id } = req.body;
  try {
    res.send(await deleteReview(id));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
