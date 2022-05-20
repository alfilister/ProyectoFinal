const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "order",
    {
      cart_list: {
        type: DataTypes.ARRAY(DataTypes.ARRAY(DataTypes.STRING)),
        allowNull: false,
      },
      products_id: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: false,
      },
      total_purchase: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      receiver_phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      state: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      shipping_address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      zip_code: {
        type: DataTypes.STRING,
      },
      status: {
        type: DataTypes.ENUM("attempted", "active", "dispatched", "complete"),
      },
      payment_id: {
        type: DataTypes.STRING,
      },
    },
    { timestamps: false, createdAt: false, updatedAt: false }
  );
};
