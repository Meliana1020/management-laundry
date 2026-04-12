const { Sequelize } = require('sequelize');
require('dotenv').config();


const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,{
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    logging: false
      // process.env.NODE_ENV === "development" 
      // ?(...msg) => console.log(msg) 
      // : false,
  }
);

module.exports = { sequelize };
