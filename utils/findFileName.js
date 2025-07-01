import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

export const __dirname = path.resolve(fileURLToPath(import.meta.url));
export function findDocxFiles (filePath="../../")
{
    const directory = path.join(__dirname, "../../"); // Replace with your directory path
    const docxFiles = [];

    try
    {
        const files = fs.readdirSync(directory); // Use sync version for simplicity in this example.

        files.forEach((file) =>
        {
            if (path.extname(file).toLowerCase() === '.docx')
            {
                docxFiles.push(file); // Or path.join(directory, file) for full path
            }
        });

        return docxFiles;
    } catch (err)
    {
        console.error('Error reading directory:', err);
        return []; // Return an empty array in case of an error
    }
}

// Example usage:

console.log(path.join(__dirname, "../../"));

 export const findDocxFile=()=>{
const docxFiles = findDocxFiles();

if (docxFiles.length > 0)
{
    console.log('Found .docx files:');
    docxFiles.forEach((fileName) =>
    {
       return fileName
    });
} else
{
    console.log('No .docx files found in the directory.');
}
}
console.log(findDocxFile);
