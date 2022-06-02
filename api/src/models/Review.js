const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
  sequelize.define(
    "review",
    {
      product_review: {
        type: DataTypes.STRING(200),
        allowNull: false
      },
      score_review: {
        type: DataTypes.DOUBLE,
        allowNull: false
      }
    },
    { timestamps: false, createdAt: false, updatedAt: false }
  )
}
