import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

export const executePrompt = async (prompt: string) => {
    const result = await model.generateContent(prompt);
    return result.response.text();
}