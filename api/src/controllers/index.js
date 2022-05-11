const {
  getApiInfo,
  chargeProductsDb,
  getProductsDb,
  postProduct,
  fillDbProducts,
} = require("./product")
const {
  getCategory,
  chargeCategoriesDb,
  postCategory,
  deleteCategory,
  updateCategory,
} = require("./category")
const { getReviewByProduct, getReviewByUser, setReview, updateReview, deleteReview } = require("./review")
const { getUser } = require("./user")

module.exports = {
  getApiInfo,
  chargeProductsDb,
  postProduct,
  fillDbProducts,
  getProductsDb,

  getCategory,
  chargeCategoriesDb,
  postCategory,
  deleteCategory,
  updateCategory,

  getReviewByProduct,
  getReviewByUser,
  setReview,
  updateReview,
  deleteReview,

  getUser,
}
