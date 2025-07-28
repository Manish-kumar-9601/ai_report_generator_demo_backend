import { app } from "./app.js";
import sequelize from "./utils/db.js";
 
 

const port = 3000;
 
try {
  await sequelize.authenticate()
    await sequelize.sync( ); 
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

 