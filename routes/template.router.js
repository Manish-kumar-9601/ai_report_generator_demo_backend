import express from "express";
// import { postTemplate } from "../controller/template.controller.js";
    
import { extractParameters } from "../utils/templateExtractor.js";  
import { upload } from "../middleware/multer.middleware.js";

const router = express.Router()
// console.log('template');
router.post("/template", upload.single("templateFile"), async(req, res) => {
  try {
    const templateFile = req.file;
    
    // console.log('Received file:', req);
    console.log("rec file",templateFile);

    if (!templateFile) {
      return res.status(400).json({ message: "File is required" });
    }

    // ✅ Pass file buffer, NOT the entire file object
    const param =await extractParameters( templateFile.path);
    console.log("Extracted Parameters:", param);

    res.json({ parameters: param ,filePath: templateFile.path });
  } catch (error) {
    console.error("Error in postTemplate:", error);
    res.status(500).json({ message: "Error processing file." });
  }
});


// router.get("/template", (req, res, next) => {

// console.log('template upload');
// res.send('Template upload endpoint');
// })
export default router;