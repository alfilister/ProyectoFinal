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
      },
      password: {
        type: DataTypes.STRING,
      },
      id_document: {
        type: DataTypes.INTEGER,
      },
    },
    { timestamps: false, createdAt: false, updatedAt: false }
  )
}
