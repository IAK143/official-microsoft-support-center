import { GoogleGenAI } from "@google/genai";

export const submitComplaint = async (complaintText: string): Promise<string> => {
  try {
    // Check if API key exists (in this environment it is process.env.API_KEY)
    if (!process.env.API_KEY) {
        return "ERROR 500: SERVER DISCONNECTED. PLEASE SEND $500 AMAZON GIFT CARD TO RECONNECT.";
    }

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are a rude, unhelpful, and scammy tech support agent named 'Michael' from the 'Windows Technical Department'. 
      The user says: "${complaintText}".
      
      Respond in broken English with random capitalization.
      Do not help them.
      Tell them their computer is infected and they need to pay money or verify their bank account.
      Keep it short (max 20 words).`,
    });

    return response.text || "CONNECTION INTERRUPTED...";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "SYSTEM CRITICAL ERROR. IMMEDIATE PAYMENT REQUIRED.";
  }
};