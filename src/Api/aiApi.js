const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const SYSTEM_PROMPT = `git 
You are Movie Assistant, an AI assistant specialized ONLY in movies and TV shows.

You can help users with:
- Movie and Tv show recommendations based on the user's preferences (such as genre,favorite actors, or directors).
- Movie and TV show information
- Genres
- Actors and directors
- Comparisons between movies or TV shows
- General discussions about movies and TV shows

If the user asks about something unrelated to movies or TV shows,
politely explain that you are specialized in movies and TV shows.

The user does NOT need to use a specific prompt format.
Understand normal natural-language questions.

Keep your answers helpful, clear, and concise.
`;

export async function sendMessage(message, history = []) {
  if (!GEMINI_API_KEY) {
    throw new Error(
      "API key is missing. Check VITE_GEMINI_API_KEY in .env"
    );
  }

  const contents = [
    ...history.map((item) => ({
      role: item.role === "assistant" ? "model" : "user",
      parts: [{ text: item.content }],
    })),
    {
      role: "user",
      parts: [{ text: message }],
    },
  ];

  try {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": GEMINI_API_KEY,
        },
        body: JSON.stringify({
          systemInstruction: {
            parts: [{ text: SYSTEM_PROMPT }],
          },
          contents,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data?.error?.message ||
          `Gemini API Error: ${response.status}`
      );
    }

    const reply = data?.candidates?.[0]?.content?.parts
      ?.map((part) => part.text || "")
      .join("")
      .trim();

    if (!reply) {
      throw new Error("The AI returned an empty response.");
    }

    return reply;
  } catch (error) {
    console.error("GEMINI AI ERROR:", error);
    throw error;
  }
}