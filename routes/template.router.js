import express from "express";
// import { postTemplate } from "../controller/template.controller.js";
    
import { extractParameters } from "../utils/templateExtractor.js";  
import { upload } from "../middleware/multer.middleware.js";
import { downloadReport, postDocTemplate, postTemplate } from "../controller/template.controller.js";

const router = express.Router()
// console.log('template');
router
  .post("/template", upload.single("templateFile"), postTemplate)
  .post("/docTemplate", postDocTemplate).get("/downloadDocReport",downloadReport);

// router.get("/template", (req, res, next) => {

// console.log('template upload');
// res.send('Template upload endpoint');
// })
export default router;