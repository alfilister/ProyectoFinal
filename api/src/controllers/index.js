const { Category, Product, Review, User } = require("../db")

const getApiInfo = async () => {
  try {
    const result = await fetch("https://fakestoreapi.com/products/1")
      .then((res) => res.json())
      .then((json) => console.log(json))

    return result
  } catch (error) {
    console.log(error)
  }
}

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
  getApiInfo,
  getCategory,
  getProduct,
  getreview,
  getUser,
}
