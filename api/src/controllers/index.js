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
const { getReview } = require("./review")
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

  getReview,

  getUser,
}
