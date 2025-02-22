import { app } from "./app.js"; 
import { fod } from "./controller/text.js";
import { findDocxFile } from "./utils/findFileName.js";
 const port = 3000;



console.log(process.env.GEMINI_API_KEY);
app.listen(port, () =>
{
    console.log(`Server is running on port ${port}`);
})