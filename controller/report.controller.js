import path from "path";
import { generator } from "../utils/generator.js";
import fs from 'fs';

import { findDocxFiles } from "../utils/findFileName.js";
import { __dirname } from "../utils/findFileName.js";

export async function makeReport (req, res)
{

    const { reportDetails } = req.body;
    try
    {
        if (!reportDetails)
        {
            return res.json({ message: 'reportDetails required' })
        }
        const docxFiles = findDocxFiles();
        if (docxFiles.length > 0)
        {
            if (docxFiles.includes('complete.docx'))
            {

                fs.unlink(`complete.docx`, function (err)
                {
                    if (err) throw err;
                  
                    console.log('complete File deleted! from makeReport ');
                });
            }
            if (docxFiles.includes('preview.docx'))
            {

                fs.unlink(`preview.docx`, function (err)
                {
                    if (err) throw err;
                    // if no error, file has been deleted successfully
                    console.log(' preview File deleted! from makeReport');
                });
            }
        }

        const result = await generator(reportDetails);
        console.log("result", result);
        res.status(200).json({ message: 'report generated', result })
    } catch (error)
    {
        console.log(error);
    }
}

export async function reportPreview (req, res)
{
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

            res.sendFile(`preview.docx`, { root: path.join(__dirname, '../../') });

            setTimeout(() =>
            {
                // if (docxFiles.includes('preview.docx'))
                // {

                //     fs.unlink(`preview.docx`, function (err)
                //     {
                //         if (err) throw err;
                //         // if no error, file has been deleted successfully
                //         console.log(' preview File deleted! from preview Report');
                //     });
                // }
            }, 5000);
        }
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

            res.sendFile(`complete.docx`, { root: path.join(__dirname, '../../') });

            setTimeout(() =>
            {
                if (docxFiles.includes('complete.docx'))
                {

                    fs.unlink(`complete.docx`, function (err)
                    {
                        if (err) throw err;
                        // if no error, file has been deleted successfully
                        console.log('complete File deleted! from send Report ');
                    });
                }
                if (docxFiles.includes('preview.docx'))
                {

                    fs.unlink(`preview.docx`, function (err)
                    {
                        if (err) throw err;
                        // if no error, file has been deleted successfully
                        console.log(' preview File deleted! from send Report');
                    });
                }
            }, 10000);
        }
    } catch (error)
    {
        console.log(error);
    }
}