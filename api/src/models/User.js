const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
  sequelize.define(
    "user",
    {
      fullName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      id_document: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    { timestamps: false, createdAt: false, updatedAt: false }
  )
}
