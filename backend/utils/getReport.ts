import { executePrompt } from "../llm/gemini"
import { ConversationSchema } from "../models/Conversation";
import { getContextByScores } from "./context/getContextForNextQuestion";
import { createContextForLLM } from "./createContext";

export const getReport = async(conversation: ConversationSchema) => {
    const context = getContextByScores(conversation);
    const score = conversation.scores.reduce((acc, current) => acc + current.score, 0);

    try {
        var response = await executePrompt(`
            Prompt:
            You are a mental health assistant tasked with analyzing the patient's mental health report based on their Beck Depression Inventory (BDI) score. Use the Question-Answer-History provided and the BECK DEPRESSION INVENTORY SCORE. Your task is to determine the patient's level of depression. Then, write a response reflecting on the patient's mental state, the severity of depression based on the BECK DEPRESSION INVENTORY SCORE following the scale provided below.
             
            Question-Answer-History:
            ${context}\n\n

            BECK DEPRESSION INVENTORY SCORE:
            "${score}"

            INTERPRETING THE BECK DEPRESSION INVENTORY SCORE:
            1-10: These ups and downs are considered normal
            11-16: Mild mood disturbance
            17-20: Borderline clinical depression
            21-30: Moderate depression
            31-40: Severe depression
            Over 40: Extreme depression

           
            Based on the Question-Answer-History and BECK DEPRESSION INVENTORY SCORE, reflect on the patient's emotional well-being, determine their level of depression from the scale above, and provide a supportive response. Include any helpful suggestions or recommendations that could aid the patient in managing their mental health. Do not make the analysis too long and respond with plain string it will be handled with program
            
            Output Content:
                Tell the patient thier score.
                Tell the patient their mental state based on the scale and discusss about their feeling.
                Suggest the patient if they need to visit professionals.
                
                Response should be a few sentenses long and sound like a professional mental health asistant is telling the report. Tone should be warm and formal.

            Output Format: 
            Output should be a plain string. Do not make sections. Do not use quotations or special characters.


            `
        );
    } catch (error) {
        throw error;
    }
    return response;
}
