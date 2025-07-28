import express from "express";
import { upload } from "../middleware/multer.middleware.js";
import { downloadReport, postDocTemplate, postTemplate } from "../controller/template.controller.js";
import { deleteDocTemplate, getDocTemplates,  uploadDocTemplate, useDocTemplate  } from "../controller/docFile.controller.js";

const router = express.Router()
// custom template routes
router
  .post("/template", upload.single("file"), postTemplate)
  .post("/docTemplate", postDocTemplate).get("/downloadDocReport",downloadReport);

// template list routes
router.post('/uploadDocTemplate', upload.single('templateFile'),uploadDocTemplate ).get('/getDocTemplates',getDocTemplates).delete('/deleteDocTemplate/:id',deleteDocTemplate ).post('/useDocTemplate', upload.single('templateFile'), useDocTemplate);

export default router;