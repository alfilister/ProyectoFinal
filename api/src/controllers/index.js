const { Category, Product, Review, User } = require("../db")

const getCategory = async () => {
  try {
    return await Category.findAll()
  } catch (error) {
    console.log(error)
  }
}
const getProduct = async () => {
  try {
    return await Product.findAll()
  } catch (error) {
    console.log(error)
  }
}
const getreview = async () => {
  try {
    return await Review.findAll()
  } catch (error) {
    console.log(error)
  }
}
const getUser = async () => {
  try {
    return await User.findAll()
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  getCategory,
  getProduct,
  getreview,
  getUser,
}
