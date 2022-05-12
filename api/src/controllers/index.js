const {
  getApiInfo,
  chargeProductsDb,
  getProductsDb,
  postProduct,
  searchProductById,
  updateProduct,
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
  searchProductById,
  getProductsDb,
  updateProduct,

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
