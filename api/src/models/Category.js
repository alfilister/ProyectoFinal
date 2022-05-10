const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
  sequelize.define(
    "category",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      }
    },
    { timestamps: false, createdAt: false, updatedAt: false }
  )
}
