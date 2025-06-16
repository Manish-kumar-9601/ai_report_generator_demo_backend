import express from "express";
import { postTemplate } from "../controller/template.controller.js";
import multer from "multer";
const upload = multer();
const router = express.Router()
console.log('template');
router.post("/template", postTemplate);
export default router;