const axios = require("axios")
const { Category, Product } = require("../db")

const getCategory = async () => {
  try {
    const mockReviews = [
      // MOCKING INFO TO LOAD
      "cellphones",
      "laptops",
      "tablets",
      "gamers",
      "accessories",
    ]
    return mockReviews
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
    await Category.findOrCreate({ name: string })
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

//FILTRO POT CATEGORIA Y PRECIO
const filterProducts = async (category, price) => {
  try {
    const allData = await Product.findAll({
      include: {
        model: Category,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    })

    const filteredProducts = allData.filter((el) => {
      for (let i = 0; el.categories.length > i; i++) {
        if (el.categories[i].name === category || "all" === category) {
          if (el.price <= price) {
            return el
          }
        }
      }
    })

    return filteredProducts
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
  filterProducts,
}
