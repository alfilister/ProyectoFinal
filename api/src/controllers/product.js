const Sequelize = require("sequelize")
const Op = Sequelize.Op
// const axios = require("axios")
const { Category, Product, Review, User } = require("../db")

const getProductInfo = async () => {
  try {
    const mockData = [
      {
        name: "Phone X",
        image:
          "https://exitocol.vtexassets.com/arquivos/ids/7918471/Iphone-X-64-Gb-Plata-1361668_c.jpg?v=637587753190270000",
        aux_images: [
          "https://assets.swappie.com/cdn-cgi/image/width=600,height=600,fit=contain,format=auto/swappie-iphone-x-space-gray.png",
          "https://cdn.pixabay.com/photo/2018/01/08/02/34/technology-3068617__340.jpg",
        ],
        description: "The best product ever",
        discount: 20,
        stock: 5,
        price: 7.95,
        featured: false,
        rating: 4.5,
        categories: ["cellphones", "tablets"],
      },
      {
        name: "SendPhone X",
        image:
          "https://exitocol.vtexassets.com/arquivos/ids/7918471/Iphone-X-64-Gb-Plata-1361668_c.jpg?v=637587753190270000",
        aux_images: [
          "https://assets.swappie.com/cdn-cgi/image/width=600,height=600,fit=contain,format=auto/swappie-iphone-x-space-gray.png",
          "https://cdn.pixabay.com/photo/2018/01/08/02/34/technology-3068617__340.jpg",
        ],
        description: "The best product ever",
        discount: 20,
        stock: 5,
        price: 17.95,
        featured: false,
        rating: 4.5,
        categories: ["cellphones"],
      },
      {
        name: "Phone XX",
        image:
          "https://exitocol.vtexassets.com/arquivos/ids/7918471/Iphone-X-64-Gb-Plata-1361668_c.jpg?v=637587753190270000",
        aux_images: [
          "https://assets.swappie.com/cdn-cgi/image/width=600,height=600,fit=contain,format=auto/swappie-iphone-x-space-gray.png",
          "https://cdn.pixabay.com/photo/2018/01/08/02/34/technology-3068617__340.jpg",
        ],
        description: "The best product ever",
        discount: 20,
        stock: 5,
        price: 95,
        featured: true,
        rating: 4.5,
        categories: ["cellphones"],
      },
      {
        name: "Super Product 2000",
        image:
          "https://exitocol.vtexassets.com/arquivos/ids/7918471/Iphone-X-64-Gb-Plata-1361668_c.jpg?v=637587753190270000",
        aux_images: [
          "https://assets.swappie.com/cdn-cgi/image/width=600,height=600,fit=contain,format=auto/swappie-iphone-x-space-gray.png",
          "https://cdn.pixabay.com/photo/2018/01/08/02/34/technology-3068617__340.jpg",
        ],
        description: "The best product ever",
        discount: 20,
        stock: 5,
        price: 995,
        featured: true,
        rating: 5,
        categories: ["laptops", "tablets", "gamers", "accessories"],
      },
      {
        name: "Chair Game Aspect Phone X",
        image:
          "https://exitocol.vtexassets.com/arquivos/ids/7918471/Iphone-X-64-Gb-Plata-1361668_c.jpg?v=637587753190270000",
        aux_images: [
          "https://assets.swappie.com/cdn-cgi/image/width=600,height=600,fit=contain,format=auto/swappie-iphone-x-space-gray.png",
          "https://cdn.pixabay.com/photo/2018/01/08/02/34/technology-3068617__340.jpg",
        ],
        description: "The not good product",
        discount: 20,
        stock: 5,
        price: 7.95,
        featured: false,
        rating: 2,
        categories: ["gamers", "accessories"],
      },
      {
        name: "headPhones for Iphone X",
        image:
          "https://exitocol.vtexassets.com/arquivos/ids/7918471/Iphone-X-64-Gb-Plata-1361668_c.jpg?v=637587753190270000",
        aux_images: [
          "https://assets.swappie.com/cdn-cgi/image/width=600,height=600,fit=contain,format=auto/swappie-iphone-x-space-gray.png",
          "https://cdn.pixabay.com/photo/2018/01/08/02/34/technology-3068617__340.jpg",
        ],
        description: "The best headphones ever",
        discount: 20,
        stock: 5,
        price: 2.95,
        featured: false,
        rating: 3,
        categories: ["accessories"],
      },
      {
        name: "Lap 8000",
        image:
          "https://exitocol.vtexassets.com/arquivos/ids/7918471/Iphone-X-64-Gb-Plata-1361668_c.jpg?v=637587753190270000",
        aux_images: [
          "https://assets.swappie.com/cdn-cgi/image/width=600,height=600,fit=contain,format=auto/swappie-iphone-x-space-gray.png",
          "https://cdn.pixabay.com/photo/2018/01/08/02/34/technology-3068617__340.jpg",
        ],
        description: "The medium product",
        discount: 20,
        stock: 5,
        price: 7.95,
        featured: false,
        rating: 3.5,
        categories: ["laptops"],
      },
    ]
    mockData.forEach(async (el) => {
      const elDb = await Product.findOne({ where: { name: el.name } })

      if (!elDb) {
        var newProduct = await Product.create({
          name: el.name,
          aux_images: el.aux_images,
          price: el.price,
          image: el.image,
          stock: el.stock,
          discount: el.discount,
          description: el.description,
          rating: el.rating,
          featured: el.featured,
        })
        let categoriesDb = await Category.findAll({
          where: { name: el.categories },
        })
        newProduct.addCategory(categoriesDb)
      }
    })

    await Product.findAll({
      include: {
        model: Category,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    })

    await Product.findAll({
      include: {
        model: Category,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
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

const searchProductByName = async (string) => {
  try {
    const product = await Product.findAll({
      where: { name: { [Op.iLike]: "%" + string + "%" } },
      include: {
        model: Category,
        attributes: ["name"],
        through: { attributes: [] },
      },
    })
    return product
  } catch (error) {
    console.log(error)
  }
}

const updateProduct = async (
  integer,
  name,
  image,
  price,
  aux_images,
  description,
  discount,
  stock,
  rating,
  category
) => {
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

  return selected
}

const deleteProduct = async (id) => {
  try {
    await Product.destroy({ where: { id: id } })
    return "Product deleted"
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
}
