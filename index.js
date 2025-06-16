import { app } from "./app.js";

const port = 3000;


console.log(process.env.GEMINI_API_KEY);
app.listen(port, () =>
{
    console.log(`Server is running on port ${port}`);
})
