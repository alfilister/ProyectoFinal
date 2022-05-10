const {
  getApiInfo,
  getProduct,
  postProduct,
  fillDbProducts,
} = require("./product")
const { getCategory } = require("./category")
const { getReview } = require("./review")
const { getUser } = require("./user")

module.exports = {
  getApiInfo,
  getProduct,
  postProduct,
  fillDbProducts,

  getCategory,

  getReview,

  getUser,
}
