const axios = require("axios")
const { Category, Product, Review, User } = require("../db")

const getApiInfo = async () => {
  try {
    const result = await axios("https://fakestoreapi.com/products/")
    const data = result.data
    return data
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

const postProduct = async (data) => {
  const {
    name,
    main_image,
    aux_images,
    description,
    discount,
    stock,
    rating,
    category,
    user,
    review,
  } = data

  let productCreated = await Product.create({
    name,
    main_image,
    aux_images,
    description,
    discount,
    stock,
    rating,
  })

  let categoriesDb = await Category.findAll({
    where: { name: category },
  })
  productCreated.addCategory(categoriesDb)

  let usersDb = await User.findAll({
    where: { name: user },
  })
  productCreated.addUser(usersDb)

  let reviewsDb = await Review.findAll({
    where: { name: review },
  })
  productCreated.addReview(reviewsDb)

  return videoCreated
}

const fillDbProducts = async () => {
  try {
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  getApiInfo,
  getProduct,
  postProduct,
  fillDbProducts,
}
