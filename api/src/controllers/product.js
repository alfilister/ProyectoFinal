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

const chargeProductsDb = async (arr) => {
  try {
    arr.forEach(async (el) => {
      let newProduct = await Product.create({
        name: el.title,
        price: el.price,
        image: el.image,
        description: el.description,
        rating: el.rating.rate,
      })

      let categoriesDb = await Category.findOne({
        where: { name: el.category },
      })
      newProduct.addCategory(categoriesDb)
    })

    return await Product.findAll({
      include: {
        model: Category,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    })
  } catch (error) {
    console.log(error)
  }
}

const getProductsDb = async () => {
  try {
    return await Product.findAll({
      include: {
        model: Category,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    })
  } catch (error) {
    console.log(error)
  }
}

const postProduct = async (body) => {
  const {
    name,
    image,
    price,
    aux_images,
    description,
    discount,
    stock,
    rating,
    category,
  } = body

  let productCreated = await Product.create({
    name,
    image,
    price,
    aux_images,
    description,
    discount,
    stock,
    rating,
    category,
  })

  let categoriesDb = await Category.findAll({
    where: { name: category },
  })
  productCreated.addCategory(categoriesDb)

  return "Producto Creado"
}

const searchProductById = async (id) => {
  try {
    const product = await Product.findByPk(id, {
      include: {
        model: Category,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    })
    return product
  } catch (error) {
    console.log(error)
  }
}

const updateProduct = async (integer, body) => {
  const {
    name,
    image,
    price,
    aux_images,
    description,
    discount,
    stock,
    rating,
    category,
  } = body
  const selected = await Product.findByPk(integer)
  selected.set({
    name,
    image,
    price,
    aux_images,
    description,
    discount,
    stock,
    rating,
    category,
  })

  selected.save()

  return "Producto Modificado"
}

module.exports = {
  getApiInfo,
  chargeProductsDb,
  getProductsDb,
  postProduct,
  searchProductById,
  updateProduct,
}
