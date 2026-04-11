const { sequelize } = require("../config/db.js");
const { DataTypes } = require("sequelize");

const financialTransactionsModel = sequelize.define(
  "FinancialTransactions",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "Orders",
        key: "id",
      },
      onDelete: "SET NULL",
    },
    payment_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "Payments",
        key: "id",
      },
      onDelete: "SET NULL",
    },
    type: {
      type: DataTypes.ENUM("pendapatan", "pengeluaran"),
      allowNull: false,
    },
    category: {
      type: DataTypes.ENUM("operasional", "upah_karyawan"),
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    amount: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
    },
    transaction_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
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
    tableName: "FinancialTransactions",
    timestamps: true,
  }
);


module.exports = { financialTransactionsModel };
