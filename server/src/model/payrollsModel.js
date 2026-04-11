const { sequelize } = require("../config/db.js");
const { DataTypes } = require("sequelize");

const payrollsModel = sequelize.define(
  "Payrolls",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    employee_name: {
      type: DataTypes.STRING,
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
      onUpdate: "CASCADE",
    },
    job_type: {
      type: DataTypes.ENUM("cuci", "setrika", "lipat"),
      allowNull: false,
    },
    fee: {
      type: DataTypes.DECIMAL(12, 2), 
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
    tableName: "Payrolls",
    timestamps: true, 
  }
);

module.exports = { payrollsModel };
