import "dotenv/config";


// Database connection setup  using Sequelize ORM
import {  Sequelize } from "sequelize";
// Sequelize connection
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
 
 

