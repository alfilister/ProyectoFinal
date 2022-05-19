require("dotenv").config()
const { Sequelize } = require("sequelize")
const fs = require("fs")
const path = require("path")
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/ecommerce`,
  {
    logging: false,
    native: false,
  }
)
const basename = path.basename(__filename)

const modelDefiners = []

fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)))
  })

modelDefiners.forEach((model) => model(sequelize))

let entries = Object.entries(sequelize.models)
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
])
sequelize.models = Object.fromEntries(capsEntries)

const { Category, Product, Review, User, Order } = sequelize.models

Product.belongsToMany(Category, { through: "product_category" })
Category.belongsToMany(Product, { through: "product_category" })
Product.belongsToMany(User, { through: "product_user" })
User.belongsToMany(Product, { through: "product_user" })
Product.hasMany(Review, {
  foreignKey: "product_id",
})
User.hasMany(Review, {
  foreignKey: "user_id",
})
User.hasMany(Order, {
  foreignKey: "user_id",
  sourceKey: "id",
})

Order.belongsTo(User, {
  foreignKey: "user_id",
  targetKey: "id",
})

module.exports = {
  ...sequelize.models,
  conn: sequelize,
}
