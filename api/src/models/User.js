const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
  sequelize.define(
    "user",
    {
      fullName: {
        type: DataTypes.STRING,
        // allowNull: false,
      },
      password: {
        type: DataTypes.STRING
      },
      email: {
        type: DataTypes.STRING,
        // allowNull: false,
      },
      id_document: {
        type: DataTypes.BIGINT,
        // allowNull: false,
      },
      role : {
        type : DataTypes.STRING
      }
      
    },
    { timestamps: false, createdAt: false, updatedAt: false }
  )
}
