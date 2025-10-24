const { sequelize } = require("../config/db.js");
const { DataTypes } = require("sequelize");

const stocksModel = sequelize.define(
  "Stocks",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    item_name: {
      type: DataTypes.ENUM("Detergen", "Parfum", "Plastik"),
      allowNull: false, 
    },
    stock_in: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    stock_out: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    unit: {
      type: DataTypes.ENUM("pcs", "liter", "kg"),
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
    tableName: "Stocks",
    timestamps: true,
  }
);

module.exports = { stocksModel };
