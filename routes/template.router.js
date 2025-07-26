import express from "express";
// import { postTemplate } from "../controller/template.controller.js";
    
 
import { upload } from "../middleware/multer.middleware.js";
import { downloadReport, postDocTemplate, postTemplate } from "../controller/template.controller.js";
import { getTemplates, uploadTemplate } from "../controller/docFile.controller.js";

const router = express.Router()
// custom template routes
router
  .post("/template", upload.single("templateFile"), postTemplate)
  .post("/docTemplate", postDocTemplate).get("/downloadDocReport",downloadReport);

// template list routes
router.post('/uploadTemplate', upload.single('templateFile'),uploadTemplate ).get('/getTemplates',getTemplates)

export default router;