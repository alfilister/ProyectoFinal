const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
  sequelize.define(
    "review",
    {
      product_review: {
        type: DataTypes.STRING(200),
      },
    },
    { timestamps: false, createdAt: false, updatedAt: false }
  )
}
