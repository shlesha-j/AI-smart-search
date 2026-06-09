import { searchWithAI } from "@/services/gemini";

export async function POST(request) {
  try {
    const { query } = await request.json();

    if (!query || typeof query !== "string") {
      return new Response(JSON.stringify({ error: "Missing query." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const response = await searchWithAI(query);

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("API search error:", error);
    return new Response(
      JSON.stringify({ error: error?.message || "Search failed." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
