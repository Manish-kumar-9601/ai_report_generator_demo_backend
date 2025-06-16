import { upload } from "../middleware/multer.middleware.js";
import { extractParameters } from "../utils/templateExtractor.js";
export const postTemplate = upload.single("templateFile", async(req, res) => {
  try {
    const templateFile = req.file;
    console.log(templateFile);

    if (!templateFile) {
      return res.status(400).json({ message: "File is required" });
    }

    // ✅ Pass file buffer, NOT the entire file object
    const param = await extractParameters(templateFile.buffer);
    console.log("Extracted Parameters:", param);

    res.json({ parameters: param });
  } catch (error) {
    console.error("Error in postTemplate:", error);
    res.status(500).json({ message: "Error processing file." });
  }
})

