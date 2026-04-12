const { sequelize } = require("../config/db");

require("../model/usersModel");
require("../model/ordersModel");
require("../model/ordersItemModel");
require("../model/paymentsModel");
require("../model/financialTransactionsModel");
require("../model/payrollsModel");
require("../model/relasi");

async function initDatabase() {
  try {
    await sequelize.authenticate();
    console.log("Database terkoneksi");

    await sequelize.sync(); 
    console.log("Sinkronisasi berhasil");
  } catch (error) {
    console.error("DB error:", error.message);
  }
}

module.exports = { initDatabase };