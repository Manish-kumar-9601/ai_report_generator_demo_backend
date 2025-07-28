// models/DocFile.js
import { DataTypes } from "sequelize";
 
import User from "./user.model.js";
import sequelize from "../utils/db.js";

const DocFile = sequelize.define(
  "DocFile",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    size: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    file_data: {
      type: DataTypes.BLOB("long"),
      allowNull: false,
    },
    file: {
      type: DataTypes.BLOB("long"),
      allowNull: false,
    },
    uploadedBy: {
      type: DataTypes.STRING,
      allowNull: true,  
      references:{
        model: User,  
        key: 'username', 
      }
    },
  },
  {
    tableName: "doc_files",
    timestamps: true,
    createdAt: true,
    updatedAt: true,
  }
);
 
export default DocFile;
