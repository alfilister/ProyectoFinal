const Sequelize = require("sequelize")
const Op = Sequelize.Op
// const axios = require("axios")
const { Category, Product, Review, User } = require("../db")
const db_mock_data = require("../../db_mock_data.json") //DATA MOCK

//GET ALL PRODUCTS IN DB
const getProductInfo = async () => {
  try {
    //DATA MOCK
    db_mock_data.products.forEach(async (product) => {
      const [p, created] = await Product.findOrCreate({
        where: {
          name: product.name.toLowerCase(),
          image: product.image,
          aux_images: product.aux_images,
          description: product.description,
          discount: product.discount,
          stock: product.stock,
          price: product.price,
          featured: product.featured,
          rating: product.rating,
        },
      })
      if (created) {
        const cat = await Category.findAll({
          where: { name: product.categories },
        })
        p.addCategory(cat)
      }
    })

    const products = await Product.findAll({
      include: [
        {
          model: Category,
          attributes: ["name"],
          through: { attributes: [] },
        },
        Review,
      ],
    })

    return products.map((p) => p.toJSON())
  } catch (error) {
    console.log(error)
  }
}

//GET PRODUCTS BY NAME
const searchProductByName = async (nameProduct) => {
  try {
    const products = await Product.findAll({
      where: { name: { [Op.substring]: nameProduct } },
      include: {
        model: Category,
        attributes: ["name"],
        through: { attributes: [] },
      },
    })
    return products
  } catch (error) {}
}

const searchProductById = async (idProduct) => {
  try {
    const product = await Product.findByPk(idProduct, {
      include: [
        {
          model: Category,
          attributes: ["name"],
          through: { attributes: [] },
        },
        Review,
      ],
    })
    return product
  } catch (error) {
    console.log(error)
  }
}

const postProduct = async (body) => {
  const {
    name,
    image,
    aux_images,
    description,
    discount,
    stock,
    price,
    rating,
    categories,
  } = body

  let productCreated = await Product.create({
    name,
    image,
    aux_images,
    description,
    discount,
    stock,
    price,
    rating,
  })

  categories.forEach(async (c) => {
    const cat = await Category.findOne({ where: { name: c } })
    productCreated.addCategory(cat.toJSON().id)
  })

  return productCreated
}

const updateProduct = async (
  idProduct,
  name,
  image,
  price,
  aux_images,
  description,
  discount,
  stock,
  rating,
  categories
) => {
  const selected = await Product.findByPk(idProduct)
  selected.set({
    name,
    image,
    price,
    aux_images,
    description,
    discount,
    stock,
    rating,
  })

  categories.forEach(async (c) => {
    const cat = await Category.findOne({ where: { name: c } })
    selected.setCategories(cat.toJSON().id)
  })

  await selected.save()

  return selected
}

const deleteProduct = async (idProduct) => {
  try {
    const productDeleted = await Product.destroy({ where: { id: idProduct } })
    return productDeleted
  } catch (error) {
    console.log(error)
  }
}

//FILTRO POR CATEGORIA Y PRECIO
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
  getProductInfo,
  postProduct,
  searchProductById,
  searchProductByName,
  updateProduct,
  deleteProduct,
  filterProducts,
}
