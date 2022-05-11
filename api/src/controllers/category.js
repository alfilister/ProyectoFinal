const axios = require("axios")
const { Category } = require("../db")

const getCategory = async () => {
  try {
    var categoryList = []
    const result = await axios("https://fakestoreapi.com/products/")
    const data = result.data.map(
      (el) =>
        !categoryList.includes(el.category) && categoryList.push(el.category)
    )

    return categoryList
  } catch (error) {
    console.log(error)
  }
}

const chargeCategoriesDb = async (array) => {
  try {
    await array.forEach((el) => {
      Category.findOrCreate({
        where: { name: el },
      })
    })

    return "Category DB charged"
  } catch (error) {
    console.log(error)
  }
}

// const postCategory = async () => {
//   try {
//   } catch (error) {
//     console.log(error)
//   }
// }

module.exports = { getCategory, chargeCategoriesDb }
