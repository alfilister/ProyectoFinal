const {
  getApiInfo,
  chargeProductsDb,
  postProduct,
  fillDbProducts,
} = require("./product")
const { getCategory, chargeDb } = require("./category")
const { getReview } = require("./review")
const { getUser } = require("./user")

module.exports = {
  getApiInfo,
  chargeProductsDb,
  postProduct,
  fillDbProducts,

  getCategory,
  chargeDb,
  // postCategory,

  getReview,

  getUser,
}
