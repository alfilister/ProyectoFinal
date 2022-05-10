const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
  sequelize.define(
    "review",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      product_review: {
        type: DataTypes.STRING(140),
        allowNull: false,
      },
    },
    { timestamps: false, createdAt: false, updatedAt: false }
  )
}
