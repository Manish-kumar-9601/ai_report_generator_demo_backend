import { docGenerator } from "../utils/docx.js";
import path from "path";
import { fileURLToPath } from "url";
export const __dirname = path.resolve(fileURLToPath(import.meta.url));
import { extractParameters } from "../utils/templateExtractor.js";
import { unlink } from "fs";
let fileName  = "";
export const postTemplate = async (req, res) => {
  try {
    const templateFile = req.file;

    // console.log('Received file:', req);
    console.log("rec file", templateFile);

    if (!templateFile) {
      return res.status(400).json({ message: "File is required" });
    }

    // ✅ Pass file buffer, NOT the entire file object
    const param = await extractParameters(templateFile.path);
    console.log("Extracted Parameters:", param);

    res.json({ parameters: param, filePath: templateFile.path });
    setTimeout(() => {
      if(`${templateFile.path}` === undefined || `${templateFile.path}` === "") {
        console.error("No file not found to delete.");
        return;
      }
      console.log("Deleting temporary file:", templateFile.path);
    unlink(templateFile.path, (err) => {
      if (err) {
        console.error("Error deleting file:", err);
      } else {
        console.log("Temporary file deleted successfully");
      }
    });
    }, 100000);
    // res.json({ message: "File received successfully" });
  } catch (error) {
    console.error("Error in postTemplate:", error);
    res.status(500).json({ message: "Error processing file." });
  }
};
export const postDocTemplate = async (req, res) => {
  try {
    const directory = path.join(__dirname, "../../");
    // Logic to retrieve templates (if applicable)
    const docArray = req.body?.docForm || [];
    const filePath = req.body?.filePath || "";
    console.log("Received docArray:", docArray, filePath);
    if (!docArray || !filePath) {
      return res
        .status(400)
        .json({ message: "docForm and filePath are required" });
    }
    // console.log('filePath :', filePath.slice(8, -1));
    fileName = filePath.slice(8, -1);
    docGenerator(docArray, filePath, filePath.slice(8, -1))
      .then((result) => {
        res.json({ message: "Document generated successfully" }).status(200);

    
      })
      .catch((error) => {
        console.error("Error generating document:", error);
        res.status(500).json({ message: "Error generating document." });
      });

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
    }, 100000);


    // res.json({ message: "Get template endpoint" });
  } catch (error) {
    console.error("Error in getTemplate:", error);
    res.status(500).json({ message: "Error retrieving templates." });
  }
}
export const downloadReport = async (req, res) => {
  try {
    const directory = path.join(__dirname, "../../");

    ;
    console.log(`${directory + fileName}`);
    res.download(`${directory + fileName}`, (err) => {
      if (err) {
        console.error("Error downloading file:", err);
        res.status(500).send("Error downloading file.");
      }
    });

    setTimeout(() => {
      console.log("Deleting temporary file:");
      if (`${directory + fileName}`=== undefined || `${directory + fileName}` === "") {
        console.error("No file not found to delete.");
        return;
      }
    unlink(`${directory + fileName}`, (err) => {
      if (err) {
        console.error("Error deleting file:", err);
      } else {
        console.log("Temporary file deleted successfully");
      }
    });
    }, 100000);
   
   
  } catch (error) {
    console.error("Error in downloadReport:", error);
    res.status(500).json({ message: "Error downloading report." });
  }
};