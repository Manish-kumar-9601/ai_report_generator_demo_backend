import fs from "fs";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";

// Documents contain sections, you can have multiple sections per document, go here to learn more about sections
// This simple example will only contain one section
export const docGenerator = async (result, fileName) => {
  // Load the template
   
  const content = fs.readFileSync("./assets/template.docx", "binary");
  const zip = new PizZip(content);
  const doc = new Docxtemplater(zip, {
    paragraphLoop: true,
    linebreaks: true,
  });

 
  // Render the document
  doc.render({
    response: result,
  });

  // Generate output
  const buffer = doc.getZip().generate({
    type: "nodebuffer",
    compression: "DEFLATE",
  });

  // Save the document
  fs.writeFileSync("output.docx", buffer);
};
