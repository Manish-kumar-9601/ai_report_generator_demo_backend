import { makeReport, reportPreview, sendReport } from '../controller/report.controller.js';
import express from 'express'
const router = express.Router()


router.post('/report', makeReport);
router.get('/report-preview', reportPreview);
router.get("/download-report", sendReport);
export default router;
