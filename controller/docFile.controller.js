import DocFile from "../models/docFile.model.js";
import { createDocFile } from "../utils/docService.js";
import fs, { unlink } from "fs";

export const uploadDocTemplate= async (req, res) => { 
    try {
      console.log('req to upload template');
        const file = req.file;
        if (!file) {
        return res.status(400).json({ message: "No file uploaded." });
        }
      console.log(file);
        const {username}= req.body;  
       
        // Assuming you want to save the file information in the database
        const size = file.size; // Get the size of the uploaded file
        if (size === 0) {
            return res.status(400).json({ message: "File is empty." });
        }
        const fileName = file.originalname; // Get the original file name
        const filePath = `${file.path}`; // Define the path where you want to save the file
        const fileData = fs.readFileSync(file.path);
     
        console.log(file, username, "file and username in uploadDocTemplate");
        
        const docId = await createDocFile(
          fileName,
          size,
          fileData,
          file,
          username
        ); // Create a new document entry in the database
  
    setTimeout(() => {
      console.log("Deleting temporary file:", filePath);
      if (filePath === undefined || filePath === "") {
        console.error("No file not found to delete.");
        return;
      }
      unlink(filePath, (err) => {
        if (err) {
          console.error("Error deleting file:", err);
        } else {
          console.log("Temporary file deleted successfully");
        }
      });
    }, 10000);
        res.status(201).json({ message: "File uploaded successfully", docId });
    } catch (error) {
        const file = req.file;
        unlink(file.path, (err) => {
          if (err) {
            console.error("Error deleting file:", err);
          } else {
            console.log("Temporary file deleted successfully");
          }
        });
        console.error("Error uploading template:", error);
        res.status(500).json({ message: "Error uploading template." });
    }
}
export const getDocTemplates = async (req, res) => {
  try {
 const file= await DocFile.findAll()
console.log(file);
    // res.sendFile(file, (err) => {
    //   if (err) {
    //     console.error("Error sending file:", err);
    //     res.status(500).json({ message: "Error sending file." });
    //   }
    // });
    res.status(200).json(file);
  } catch (error) {
    console.error("Error in getTemplate:", error);
    res.status(500).json({ message: "Error retrieving template." });
  }
}
export const deleteDocTemplate = async (req, res) => {
  try {
    const { id } = req.params;
    const docTemplate = await DocFile.findByPk(id);
    if (!docTemplate) {
      return res.status(404).json({ message: "Document template not found." });
    }
    
    await docTemplate.destroy();
    res.status(200).json({ message: "Document template deleted successfully." });
  } catch (error) {
    console.error("Error deleting document template:", error);
    res.status(500).json({ message: "Error deleting document template." });
  }
}
