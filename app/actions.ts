"use server";

import { SYSTEM_PROMPT } from "@/lib/system-prompt";

export async function chatWithGemini(userMessage: string) {
  // Access key securely from server environment
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return { error: "API Key Configuration Error: Key not found on server." };
  }

  try {
    // Use the 2.0 Flash Lite model (designed for speed and reliability, often less congested)
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: `SYSTEM CONTEXT: ${SYSTEM_PROMPT}\n\nUSER QUESTION: ${userMessage}` }],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    if (data.error) {
        console.error("Gemini API Error:", data.error);
        return { error: `API Error: ${data.error.message}` };
    }

    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!reply) {
        return { error: "No response received from AI." };
    }

    return { success: true, reply };

  } catch (error) {
    console.error("Server Action Error:", error);
    return { error: "Internal Server Error. Please try again later." };
  }
}
