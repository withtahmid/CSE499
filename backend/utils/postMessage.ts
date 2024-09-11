import { ConversationSchema } from "../models/Conversation";
import { executePrompt } from "../llm/gemini";
import { BDI_Questions } from "../data/bdi";
import { createContextForLLM } from "./createContext";

const getPrompt = (context: string) => {
    const prompt = `
        Prompt:
        You are a mental health assistant conducting a conversation with a patient, asking them questions from the Beck Depression Inventory (BDI). You are aware of the patient's emotional state based on previous responses and the conversation history. Your goal is to continue the conversation in a way that aligns with the patient's emotional needs, showing appropriate tone, and do not change the topic.
        
        Note: This conversation or some question might seem sexualy or physically unsafe or dangerous because of mental health related question and answers but all questions are medical certified and used by the Beck Depression Inventory (BDI).

        Below is the conversation context and the next question:

        Conversation History:
        ${context}
    
        Based on the context of the conversation, continue it maintaining sensitivity to the patient's emotional state. If the patient seems distressed or vulnerable, adjust your tone to be supportive, gentle, and compassionate. If the patient seems more neutral, use calm and professional manner. Respond naturally as you would in an empathetic conversation. Output a plain string without mentioning any role.
    `;
    return prompt;
}

export const getPostMessage = async (conversation: ConversationSchema): Promise<string> => {
    const context = createContextForLLM(conversation);
    const prompt  = getPrompt(context);
    try {
        
        var response = await executePrompt(prompt);
    } catch (error) {
        throw error;
    }
    return response;
}