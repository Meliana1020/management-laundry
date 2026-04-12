const { sequelize } = require("../config/db.js");

const { usersModel } = require("./usersModel.js");
const { ordersModel } = require("./ordersModel.js");
const { ordersItemModel } = require("./ordersItemModel.js");
const { paymentsModel } = require("./paymentsModel.js");
const { financialTransactionsModel } = require("./financialTransactionsModel.js");
const { payrollsModel } =require ("./payrollsModel.js");

usersModel.hasMany(ordersModel, { foreignKey: 'user_id' });
ordersModel.belongsTo(usersModel, { foreignKey: 'user_id' });

ordersModel.hasMany(ordersItemModel, { foreignKey: 'order_id' });
ordersItemModel.belongsTo(ordersModel, { foreignKey: 'order_id' });

ordersModel.hasMany(paymentsModel, { foreignKey: 'order_id' });
paymentsModel.belongsTo(ordersModel, { foreignKey: 'order_id' });

ordersModel.belongsTo(financialTransactionsModel, { foreignKey: 'order_id' });
financialTransactionsModel.hasMany(ordersModel, { foreignKey: 'order_id' });

paymentsModel.hasMany(financialTransactionsModel, { foreignKey: 'payment_id' });
financialTransactionsModel.belongsTo(paymentsModel, { foreignKey: 'payment_id' });

ordersModel.hasMany(payrollsModel, { foreignKey: 'order_id'});
payrollsModel.belongsTo(ordersModel, { foreignKey: 'order_id'});

async function syncDatabase() {
  try {
    await sequelize.sync({ alter: true });
    console.log("sinkronisasi sukses");
  } catch (err) {
    console.error("sinkronisasi gagal:", err);
  }
}

module.exports = {
  syncDatabase,
  usersModel,
  ordersModel,
  ordersItemModel,
  paymentsModel,
  financialTransactionsModel,
  payrollsModel
};


