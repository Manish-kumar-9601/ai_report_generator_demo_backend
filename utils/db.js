import "dotenv/config";

// Database connection setup  using Sequelize ORM
import {  Sequelize } from "sequelize";
// Sequelize connection




//  //local Sql connection
//  const sequelize = new Sequelize(
//    process.env.MYSQL_DATABASE,
//    process.env.MYSQL_USER,
//    process.env.MYSQL_PASSWORD,
//    {
//      host: process.env.MYSQL_HOST,
//      dialect: "mysql",
//    }
//  );


// // postgres connection
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
    },
  },
});

await sequelize.sync({ alter: true }); // Syncs the model with the database

 
export default  sequelize;
 
 

