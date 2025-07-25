import { createDocFile } from "../utils/docService.js";
import fs, { unlink } from "fs";
export const uploadTemplate= async (req, res) => { 
    try {
        const file = req.file;
        if (!file) {
        return res.status(400).json({ message: "No file uploaded." });
        }
    
        // Assuming you want to save the file information in the database
        const size = file.size; // Get the size of the uploaded file
        if (size === 0) {
            return res.status(400).json({ message: "File is empty." });
        }
        const fileName = file.originalname; // Get the original file name
        const filePath = `${file.path}`; // Define the path where you want to save the file
        const fileData = fs.readFileSync(file.path);
     
        console.log(file,   );
        const docId = await createDocFile(fileName, size, fileData); // Create a new document entry in the database
  
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
    }, 1000);
  
        
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