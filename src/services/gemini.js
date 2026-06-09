import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const PRIMARY_MODEL = "gemini-2.5-flash";
const FALLBACK_MODEL = "gemini-2.1";

async function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function generateContentWithRetry(prompt, modelName) {
  const retries = 3;
  let attempt = 0;
  let lastError;

  while (attempt < retries) {
    attempt += 1;
    try {
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent(prompt);
      return await result.response.text();
    } catch (error) {
      lastError = error;
      const message = String(error?.message || error);

      if (message.includes("503") || message.includes("high demand")) {
        const backoff = attempt * 1200;
        console.warn(
          `Gemini ${modelName} unavailable on attempt ${attempt}, retrying in ${backoff}ms...`,
          message
        );
        await delay(backoff);
        continue;
      }

      throw error;
    }
  }

  throw lastError;
}

export async function searchWithAI(query) {
  const prompt = `
  User Search Query: ${query}

  Return a JSON object:

  {
    "summary": "...",
    "results": [
      "...",
      "...",
      "..."
    ],
    "suggestions": [
      "...",
      "...",
      "..."
    ]
  }
  `;

  let text;
  try {
    text = await generateContentWithRetry(prompt, PRIMARY_MODEL);
  } catch (primaryError) {
    console.warn(
      `Primary model ${PRIMARY_MODEL} failed, falling back to ${FALLBACK_MODEL}.`,
      primaryError?.message || primaryError
    );
    text = await generateContentWithRetry(prompt, FALLBACK_MODEL);
  }

  try {
    return JSON.parse(text);
  } catch (error) {
    console.error("Failed to parse Gemini response as JSON:", text, error);
    return { summary: text, results: [], suggestions: [] };
  }
}
