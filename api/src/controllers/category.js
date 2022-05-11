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

const postCategory = async (string) => {
  try {
    await Category.create({ name: string })
    return "Category created"
  } catch (error) {
    console.log(error)
  }
}

const deleteCategory = async (string) => {
  try {
    await Category.destroy({ where: { name: string } })
    return "Category deleted"
  } catch (error) {
    console.log(error)
  }
}

const updateCategory = async (integer, string) => {
  try {
    const selected = await Category.findByPk(integer)
    selected.set({ name: string })
    selected.save()
    return "Category Updated"
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  getCategory,
  chargeCategoriesDb,
  postCategory,
  deleteCategory,
  updateCategory,
}
