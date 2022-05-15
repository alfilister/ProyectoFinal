const axios = require("axios")
const { Category, Product } = require("../db")
const db_mock_data = require('../../db_mock_data.json');//DATA MOCK

//DATABASE INFO - CATEGORY
const getCategories = async () => {
  try {
    //GET DATA MOCK
    db_mock_data.categories.forEach(async (category)=>{
       await Category.findOrCreate({
        where: {name: category}
      })
    })

    //DB INFO
    return await Category.findAll()

  } catch (error) {
    console.log(error)
  }
}

//CREATE A CATEGORY
const postCategory = async (nameCategory) => {
  try {
    return await Category.findOrCreate({
      where: {name: nameCategory}
    })
  } catch (error) {
    console.log(error)
  }
}

//DELETE CATEGORY
const deleteCategory = async (idCategory) => {
  try {
    return await Category.destroy({ where: { id: idCategory } })
  } catch (error) {
    console.log(error)
  }
}

//UPDATE CATEGORY
const updateCategory = async (idCategory, newCategory) => {
  try {
    const selected = await Category.findByPk(idCategory)
    selected.set({ name: newCategory })
    return await selected.save()
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  getCategories,
  postCategory,
  deleteCategory,
  updateCategory,
}
