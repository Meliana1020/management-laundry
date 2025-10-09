import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pkg;

const pool = new Pool({
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  port: Number(process.env.DB_PORT) || 5432,
  ssl: {
    rejectUnauthorized: false,
  },
});

export default pool;


// import dotenv from "dotenv";
// dotenv.config();
// import { Sequelize } from "sequelize";

// export const sequelize = new Sequelize(
//   process.env.DB_NAME,       
//   process.env.DB_USER,       
//   process.env.DB_PASSWORD,   
//   {
//     host: process.env.DB_HOST,
//     dialect: "postgres",     
//     port: process.env.DB_PORT,
//     logging: false,          
//   }
// );

// try {
//   await sequelize.authenticate();
//   console.log(" Terhubung ke basis data.");
// } catch (error) {
//   console.error(" Gagal terhubung ke basis data:", error.message);
// }