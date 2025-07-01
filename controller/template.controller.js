 
import { docGenerator } from "../utils/docx.js";
import { extractParameters } from "../utils/templateExtractor.js";
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
  } catch (error) {
    console.error("Error in postTemplate:", error);
    res.status(500).json({ message: "Error processing file." });
  }
};
export const postDocTemplate = async (req, res) => {
  try {
    // Logic to retrieve templates (if applicable)
    const docArray =req.body?.docForm || [];
    const filePath = req.body?.filePath || "";
    console.log("Received docArray:", docArray ,filePath);
    if (!docArray || !filePath) {
      return res.status(400).json({ message: "docForm and filePath are required" });
    }
    docGenerator(docArray, filePath, "doc")
      .then((result) => {
        console.log("Document generated successfully:", result);
        // res.json({ message: "Document generated successfully", filePath: result });

      })
      .catch((error) => {
        console.error("Error generating document:", error);
        res.status(500).json({ message: "Error generating document." });
      });
    // res.json({ message: "Get template endpoint" });
  } catch (error) {
    console.error("Error in getTemplate:", error);
    res.status(500).json({ message: "Error retrieving templates." });
  }
}