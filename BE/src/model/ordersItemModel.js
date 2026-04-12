const { sequelize } = require("../config/db.js");
const { DataTypes } = require("sequelize");

const ordersItemModel = sequelize.define(
  "OrdersItem",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Orders",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    unit_price: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
    },
    updated_by: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    deleted_by: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    deleted_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "OrdersItem",
    timestamps: true, 
  }
);



module.exports = { ordersItemModel };
