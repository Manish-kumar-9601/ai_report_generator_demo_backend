
import mammoth from 'mammoth';
export const extractParameters = async (fileBuffer) => {
  return mammoth.extractRawText({ buffer: fileBuffer }).then((result) => {
 
    const text = result.value;
    const parameters = [];
    const regex = /\{{(.*?)\}}/g; // Extract parameters within { }
    let match;
    while ((match = regex.exec(text)) !== null) {
      parameters.push(match[1].trim());
    }
    return parameters;
  });
};
