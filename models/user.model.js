import { DataTypes } from "sequelize";
 
import bcryptjs from "bcryptjs";
import sequelize from "../utils/db.js";
const User = sequelize.define(
  "Users",   
    {
        id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrementIdentity: true,
        autoIncrement: true,  
        },
        username: {
        type: DataTypes.STRING,
        allowNull: false,
       
        },
        email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        },
        password: {
        type: DataTypes.STRING,
        allowNull: false,
        },
        department: {
        type: DataTypes.STRING,
        allowNull: true,
        },
        role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "user",
        },
    },
    {
        tableName: "users",
        timestamps: true,
        createdAt: true,
        updatedAt: true,
    }
);
User.beforeSave((user, options) => {
  if (user.changed("password")) {
    // Hash the password before saving it to the database
    const saltRounds = 10;
    return bcryptjs.hash(user.password, saltRounds).then((hash) => {
      user.password = hash;
    });
  }
});

export default User;