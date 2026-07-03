import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const PRIMARY_MODEL = "gemini-2.5-flash";
const FALLBACK_MODEL = "gemini-2.0-flash";

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

function extractJsonFromText(text) {
  if (!text || typeof text !== "string") {
    return null;
  }

  let candidate = text.trim();
  const fencedMatch = candidate.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fencedMatch) {
    candidate = fencedMatch[1].trim();
  }

  const firstBrace = candidate.indexOf("{");
  const lastBrace = candidate.lastIndexOf("}");
  if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
    const jsonString = candidate.slice(firstBrace, lastBrace + 1);
    try {
      return JSON.parse(jsonString);
    } catch (error) {
      // fall through and try the raw candidate
    }
  }

  try {
    return JSON.parse(candidate);
  } catch (error) {
    return null;
  }
}

export async function searchWithAI(query) {
  const prompt = `
  User Search Query: ${query}

  Return a JSON object exactly in this format, without any extra markdown or explanation:

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

  const parsed = extractJsonFromText(text);
  if (parsed && typeof parsed === "object") {
    return parsed;
  }

  console.error("Failed to parse Gemini response as JSON:", text);
  return { summary: text, results: [], suggestions: [] };
}
