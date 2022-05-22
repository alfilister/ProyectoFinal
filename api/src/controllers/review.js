const { Review, User, Product } = require("../db");
const db_mock_data = require("../../db_mock_data.json"); //DATA MOCK

const getReviewByProduct = async () => {
  try {
    //GET DATA MOCK
    db_mock_data.reviews.forEach(async (review) => {
      await Review.findOrCreate({
        where: {
          product_review: review.product_review,
          score_review: review.score_review,
          product_id: review.product_id,
          user_id: review.user_id,
        },
      });
    });

    return await Product.findAll({
      include: Review,
    });
  } catch (error) {
    console.log(error);
  }
};

const getReviewByUser = async () => {
  try {
    //GET DATA MOCK
    db_mock_data.reviews.forEach(async (review) => {
      await Review.findOrCreate({
        where: {
          product_review: review.product_review,
          score_review: review.score_review,
          product_id: review.product_id,
          user_id: review.user_id,
        },
      });
    });

    return await User.findAll({
      include: Review,
    });
  } catch (error) {
    console.log(error);
  }
};

const setReview = async (user_id, product_id, product_review, score_review) => {
  try {
    const review = await Review.create({
      product_review,
      score_review,
      product_id,
      user_id,
    });
    return review;
  } catch (error) {
    console.log(error);
  }
};

const updateReview = async (id, product_review, score_review) => {
  try {
    const review = await Review.findByPk(id);
    review.product_review = product_review;
    review.score_review = score_review;
    await review.save();
    return review;
  } catch (error) {
    console.log(error);
  }
};

const deleteReview = async (id) => {
  try {
    const review = await Review.findByPk(id);
    review.destroy();
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getReviewByUser,
  getReviewByProduct,
  setReview,
  updateReview,
  deleteReview,
};
