const axios = require("axios")

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

module.exports = { getCategory }
