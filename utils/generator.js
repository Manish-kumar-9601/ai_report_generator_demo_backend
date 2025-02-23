
import 'dotenv/config'
import { docGenerator } from './docx.js';
import { GoogleGenerativeAI } from "@google/generative-ai"
const gemini_key = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(gemini_key);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
export const generator = async (userPrompt, fileName) =>
{


  const result = await model.generateContent({
    contents: [
      {
        role: 'system',
        parts: [
          {
            text: "provide clear instructions and structure outline for writing a detailed and well organized report in one paragraph "
          }
        ],
      }
    ],
    contents: [
      {
        role: 'user',
        parts: [
          {
            text: userPrompt,
          }
        ],
      }
    ],
    generationConfig: {
      maxOutputTokens: 1000,
      temperature: 0.1,
    }
  });

  // console.log(result.response.text());
  const done = result.response.text().replaceAll('**', '  ');

  docGenerator(done, 'complete','complete')
  docGenerator(done, 'preview','preview')
  return done
}
// const localUrl = "http://localhost:1234/v1/chat/completions "

// import { LMStudioClient } from "@lmstudio/sdk";
// const client = OpenAI(base_url = "http://0.0.0.0:1234/v1", api_key = "lm-studio")
// const MODEL = "llama-3.2-3b-instruct"


// const client = new LMStudioClient({
//   baseUrl: localUrl,
// });
// // Load a model
// const llama3 = await client.llm.load("llama-3.2-3b-instruct");
// export const generator = async (userPrompt) =>
// {
//   // Create a text completion prediction
//   const prediction = llama3.complete(userPrompt);

//   // Stream the response
//   for await (const { content } of prediction)
//   {
//     const response = process.stdout.write(content);
//     console.log(response);
//   }
// }
// //   -H "Content-Type: application/json" \
// //   -d '{
// //     "model": "llama-3.2-3b-instruct",
// //     "messages": [
// //       { "role": "system", "content": "Always answer in rhymes. Today is Thursday" },
// //       { "role": "user", "content": "What day is it today?" }
// //     ],
// //     "temperature": 0.7,
// //     "max_tokens": -1,
// //     "stream": false
// // }'



// await printDownloadedModels();
// // await printLoadedModels();
// // await predictWithAnyModel();

// // ---------- Functions ----------

// export async function printDownloadedModels ()
// {
//   const downloadedModels = await client.system.listDownloadedModels();
//   console.log("Downloaded Models:");
//   if (downloadedModels.length === 0)
//   {
//     console.log("    No models downloaded. Get some in LM Studio.");
//     process.exit(0);
//   }

//   // Limit to printing 5 models
//   for (const model of downloadedModels.slice(0, 5))
//   {
//     console.log(`  - ${model.path} (${model.architecture})`);
//   }
//   if (downloadedModels.length > 5)
//   {
//     console.log(`    (... and ${downloadedModels.length - 5} more)`);
//   }
//   console.log(); // Create an empty line
// }

// export async function printLoadedModels ()
// {
//   const loadedLLMs = await client.llm.listLoaded();
//   console.log("Loaded Models:", loadedLLMs);
//   if (loadedLLMs.length === 0)
//   {
//     console.log("    You don't have any models loaded. (Run `lms load` to load a model)");
//     process.exit(0);
//   }
//   for (const model of loadedLLMs)
//   {
//     console.log(`  - ${model.identifier}`);
//   }
//   console.log(); // Create an empty line
// }

// export async function predictWithAnyModel ()
// {
//   const model = await client.llm.load('hugging-quants/Llama-3.2-3B-Instruct-Q8_0-GGUF')
//   const prompt = "The meaning of life is";
//   const prediction = model.complete(prompt, {
//     maxPredictedTokens: 100,
//     temperature: 0.7,
//   });
//   process.stdout.write(prompt); // Print the prompt
//   // Stream the prediction text to console
//   for await (const { content } of prediction)
//   {
//     process.stdout.write(content);
//   }
//   const { stats } = await prediction.result();
//   console.log("\n\nPrediction Stats:", stats);
// }
