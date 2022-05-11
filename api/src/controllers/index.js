const {
  getApiInfo,
  chargeProductsDb,
  getProductsDb,
  postProduct,
  searchProductById,
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

  getCategory,
  chargeCategoriesDb,
  postCategory,
  deleteCategory,
  updateCategory,

  getReview,

  getUser,
}
