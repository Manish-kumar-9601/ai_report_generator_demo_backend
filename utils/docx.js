import fs from "fs";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";

// Documents contain sections, you can have multiple sections per document, go here to learn more about sections
// This simple example will only contain one section
export const docGenerator = async (docForm,filePath,fileName) => {
  // Load the template
  let docxPath=`${filePath}`;
  // if(purpose==='preview'){
  //   docxPath='./assets/preview_template.docx'
  // }
  const content = fs.readFileSync(docxPath, "binary");
  const zip = new PizZip(content);
  const doc = new Docxtemplater(zip, {
    paragraphLoop: true,
    linebreaks: true,
  });

 
  // Render the document
  doc.render(docForm)

  // Generate output
  const buffer = doc.getZip().generate({
    type: "nodebuffer",
    compression: "DEFLATE",
  });

  // Save the document
  fs.writeFileSync(`${fileName}`, buffer);
};
