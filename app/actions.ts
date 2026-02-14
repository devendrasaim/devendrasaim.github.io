"use server";

import { SYSTEM_PROMPT } from "@/lib/system-prompt";

export async function chatWithGemini(userMessage: string) {
  // Access key securely from server environment
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return { error: "API Key Configuration Error: Key not found on server." };
  }

  try {
    // Use the 1.5 Flash Lite "Latest" model (Standard Free Tier, usually very reliable)
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-lite-latest:generateContent?key=${apiKey}`,
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
