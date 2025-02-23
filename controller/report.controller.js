import path from "path";
import { generator } from "../utils/generator.js";
import fs from 'fs';
import { fileURLToPath } from "url";
import { findDocxFiles } from "../utils/findFileName.js";
import { __dirname } from "../utils/findFileName.js";
import { socket } from "../app.js";
export async function makeReport (req, res)
{
    const { docTitle, reportDetails } = req.body;
    try
    {
        if (!reportDetails)
        {
            return res.json({ message: 'reportDetails required' })
        }
        const result =await generator(reportDetails, docTitle);
        console.log("result", result);
        socket.emit('result', result)
        res.status(200).json({ message: 'report generated', result })
    } catch (error)
    {
        console.log(error);
    }
}


export async function sendReport (req, res)
{
    // res.json({ message: 'report sent' })
    try
    {
        let filename;
        const docxFiles = findDocxFiles();
        console.log(docxFiles);
        if (docxFiles.length > 0)
        {
            console.log("Found .docx files:");
            docxFiles.forEach((fileName) =>
            {
                filename = fileName;
            });
        } else
        {
            console.log("No .docx files found in the directory.");
        }
        console.log('file', filename);
        if (filename)
        {

            res.sendFile(`${filename}`, { root: path.join(__dirname, '../../') });

            setTimeout(() =>
            {
                fs.unlink(`${filename}`, function (err)
                {
                    if (err) throw err;
                    // if no error, file has been deleted successfully
                    console.log('File deleted!');
                });
            }, 10000);
        }
    } catch (error)
    {
        console.log(error);
    }
}