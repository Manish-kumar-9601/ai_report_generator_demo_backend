import "dotenv/config";

// Database connection setup without using ORM
// import { createConnection } from "mysql2/promise";
// MySQL Database connection
// const connection = createConnection({
//   host: process.env.MYSQL_HOST ,
//   user: process.env.MYSQL_USER ,
//   password: process.env.MYSQL_PASSWORD ,
//   // database: process.env.MYSQL_DATABASE ,
//   port: process.env.MYSQL_PORT,
// });

// Database connection setup  using Sequelize ORM
import {  Sequelize } from "sequelize";
// Sequelize connection
 const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE,
  process.env.MYSQL_USER,
  process.env.MYSQL_PASSWORD,
  {
    host: process.env.MYSQL_HOST,
    dialect: "mysql",
  }
);
await sequelize.sync({ alter: true }); // Syncs the model with the database

 
export default  sequelize;
 
 

