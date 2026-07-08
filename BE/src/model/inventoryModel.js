const { sequelize } = require("../config/db.js");
const { DataTypes } = require("sequelize");

const inventoryModel = sequelize.define(
  "Inventory",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },

    item_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },

    satuan: {
      type: DataTypes.STRING,
      allowNull: false,
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
    tableName: "Inventory",
    timestamps: true,
  }
);

module.exports = { inventoryModel };