const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "user",
    {
      fullName: {
        type: DataTypes.STRING,
        // allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
        // allowNull: false,
      },
      id_document: {
        type: DataTypes.BIGINT,
      },
      role: {
        type: DataTypes.STRING,
        defaultValue: "Admin",
      },
      image: {
        type: DataTypes.TEXT,
      },
      access: {
        type: DataTypes.STRING,
        defaultValue: "Authorized",
      },
    },
    { timestamps: false, createdAt: false, updatedAt: false }
  );
};
