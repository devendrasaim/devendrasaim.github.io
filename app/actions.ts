"use server";

import { SYSTEM_PROMPT } from "@/lib/system-prompt";

export async function chatWithGemini(userMessage: string) {
  // Access key securely from server environment
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    console.error("API Key Missing");
    return { error: "API Key Configuration Error: Key not found on server." };
  }

  // Define model fallback order
  const models = [
    "gemini-2.5-pro",
    "gemini-2.5-flash",
    "gemini-1.5-flash"
  ];

  let reply: string | undefined;
  let lastError: any;

  for (const model of models) {
    try {
      console.log(`Attempting Gemini formulation with model: ${model}`);
      
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
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

      if (!response.ok || data.error) {
        // Check if it's a rate limit error (429) or quota exceeded.
        const errorMsg = data.error?.message || "Unknown API Error";
        const errorCode = data.error?.code || response.status;
        console.warn(`[Gemini Fallback] Model ${model} failed with code ${errorCode}: ${errorMsg}`);
        lastError = errorMsg;
        
        // If the error isn't a rate limit/quota error, we might still want to try the next model just in case,
        // but typically 429s are what we are catching.
        continue;
      }

      reply = data.candidates?.[0]?.content?.parts?.[0]?.text;
      
      if (reply) {
        console.log(`Successfully generated response using ${model}.`);
        break; // Success! Break out of the loop.
      } else {
        console.warn(`[Gemini Fallback] Model ${model} returned an empty response. Trying next...`);
      }

    } catch (error) {
      console.error(`Fetch error with model ${model}:`, error);
      lastError = error;
      continue;
    }
  }

  if (!reply) {
    console.error("All Gemini models failed. Last error:", lastError);
    return { error: "Chatbot is currently experiencing heavy traffic. Please try again in a minute!" };
  }

    // --- STRUCTERED LOGGING FOR ANALYTICS ---
    console.log(JSON.stringify({
      event: "chat_interaction",
      timestamp: new Date().toISOString(),
      user_message: userMessage,
      ai_response: reply,
      status: "success"
    }));
    // ----------------------------------------

    return { success: true, reply };
}

import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export async function sendEmail(prevState: any, formData: FormData) {
  const data = {
    name: formData.get("name"),
    email: formData.get("email"),
    subject: formData.get("subject"),
    message: formData.get("message"),
  };

  const validatedFields = contactSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Log to console (Simulation)
  console.log("--- EMAIL SENT ---");
  console.log(validatedFields.data);
  console.log("------------------");

  return {
    success: true,
    message: "Transmission received. I will establish connection shortly.",
  };
}
