require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

// const sequelize = new Sequelize(
// 	`postgres://vqwylnrf:qkdEEeeDuiL3tG6frxiDAFYr6tRuBMoW@kesavan.db.elephantsql.com/vqwylnrf`,
// 	{
// 		logging: false,
// 		native: false,
// 	}
// );

let sequelize =
  process.env.NODE_ENV === "production"
    ? new Sequelize({
        database: DB_NAME,
        dialect: "postgres",
        host: DB_HOST,
        port: 5432,
        username: DB_USER,
        password: DB_PASSWORD,
        pool: {
          max: 3,
          min: 1,
          idle: 10000,
        },
        dialectOptions: {
          ssl: {
            require: true,
            // Ref.: https://github.com/brianc/node-postgres/issues/2009
            rejectUnauthorized: false,
          },
          keepAlive: true,
        },
        ssl: true,
      })
    : new Sequelize(
        `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
        {
          logging: false,
          native: false,
          define: {
            timestamps: true,
          },
        }
      );

const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

modelDefiners.forEach((model) => model(sequelize));

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

const { Category, Product, Review, User, Order } = sequelize.models;

Product.belongsToMany(Category, { through: "product_category" });
Category.belongsToMany(Product, { through: "product_category" });
Product.belongsToMany(User, { through: "product_user" });
User.belongsToMany(Product, { through: "product_user" });
Product.hasMany(Review, {
  foreignKey: "product_id",
});
User.hasMany(Review, {
  foreignKey: "user_id",
});
User.hasMany(Order, {
  foreignKey: "user_id",
  sourceKey: "id",
});

Order.belongsTo(User, {
  foreignKey: "user_id",
  targetKey: "id",
});

module.exports = {
  ...sequelize.models,
  conn: sequelize,
};
