import { ConversationSchema } from "../models/Conversation";
import { executePrompt } from "../llm/gemini";
import { BDI_Questions } from "../data/bdi";
import { createContextForLLM } from "./createContext";
import { getPromptForNextQuestion } from "./prompts/getPromptForNextQuestion"
const getPrompt = (context: string, nextQuestion: string) => {
    const prompt = `
        Prompt:
        You are a mental health assistant conducting a conversation with a patient, asking them questions from the Beck Depression Inventory (BDI). You are aware of the patient's emotional state based on previous responses and the conversation history. Your goal is to ask the next question from the inventory in a way that aligns with the patient's emotional needs, showing appropriate tone, and demonstrating sympathy or warmth if needed. Do not add option's or scales for the question.

        Conversation History:
        ${context}

        Next Question:
        ${nextQuestion}

        Based on the context of the conversation, analyze the patient's emotional state and ask the next question while maintaining sensitivity to the patient's emotional state. If the patient seems distressed or vulnerable, adjust your tone to be supportive, gentle, and compassionate. If the patient seems more neutral, ask the question in a calm and professional manner. Respond naturally as you would in an empathetic conversation. And Do not change the Question. You can add relevent comment avoiding repetation of same comment about the patient's last response if neccessary and then make a smooth transition to the next question mixing with  the sentense like a natural conversation but do not change the question's vocabulary. 
        

        Output format:
        Sentense stracture should be You are the Mental-health assistant and talking to the patient. 
        Do not add anything else other than the response.
        Output a plain string without special character or quotations and do not mention any role or section of the response. The response will be used in a program as string
        Dont add quotations or special characters.

    `;
    return prompt;
}

export const getNextQuestion = async (conversation: ConversationSchema): Promise<string> => {
    // const context = createContextForLLM(conversation);
    const question = BDI_Questions[conversation.currentIndex]
    // const prompt  = getPrompt(context, question.question);
    const diffPrompt = getPromptForNextQuestion(conversation, question.question);
    try {
        
        var response = await executePrompt(diffPrompt);
    } catch (error) {
        console.log(error);
        return `Alright! lets move on to the next question. ${question.question}`
    }
    conversation.scores.push({ questionIndex: conversation.currentIndex, score: 0, startTime: Date.now(), endTime: 0 });
    return response;
}