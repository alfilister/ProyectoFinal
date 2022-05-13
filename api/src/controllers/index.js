const {
  getProductInfo,
  postProduct,
  searchProductById,
  searchProductByName,
  updateProduct,
  deleteProduct,
} = require("./product")
const {
  getCategory,
  chargeCategoriesDb,
  postCategory,
  deleteCategory,
  updateCategory,
  filterProducts,
} = require("./category")
const {
  getReviewByProduct,
  getReviewByUser,
  setReview,
  updateReview,
  deleteReview,
} = require("./review")
const { getUser } = require("./user")

module.exports = {
  getProductInfo,
  postProduct,
  searchProductById,
  searchProductByName,
  updateProduct,
  deleteProduct,

  getCategory,
  chargeCategoriesDb,
  postCategory,
  deleteCategory,
  updateCategory,
  filterProducts,

  getReviewByProduct,
  getReviewByUser,
  setReview,
  updateReview,
  deleteReview,

  getUser,
}
