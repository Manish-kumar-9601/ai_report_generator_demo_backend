import { DataTypes } from "sequelize";
import sequelize from "../utils/db.js";
 

const Roles= sequelize.define("Roles", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  roleName: {
    type:  DataTypes.STRING,
    allowNull: false,
    unique: true,
    },
 
  },    
    {
        tableName: "roles",
        timestamps: true,
        createdAt: true,
        updatedAt: true,
    }
)
export default Roles;