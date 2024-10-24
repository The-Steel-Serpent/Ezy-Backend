const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const UserOrder = sequelize.define(
  "UserOrder",
  {
    user_order_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    shop_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "shop",
        key: "shop_id",
      },
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    total_quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    total_price: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    shipping_fee: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    discount_shipping_fee: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    discount_price: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    payment_method_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "payment_method",
        key: "payment_method_id",
      },
    },
    transaction_code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    order_note: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "user_order",
    updatedAt: false,
    createdAt: false,
  }
);

module.exports = UserOrder;
