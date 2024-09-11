import { executePrompt } from "../llm/gemini"
import { ConversationSchema } from "../models/Conversation";
import { createContextForLLM } from "./createContext";

export const getReport = async(conversation: ConversationSchema) => {
    const context = createContextForLLM(conversation);
    const score = conversation.scores.reduce((acc, current) => acc + current.score, 0);

    try {
        var response = await executePrompt(`
            Prompt:
            You are a mental health assistant tasked with analyzing the patient's mental health report based on their Beck Depression Inventory (BDI) score. Use the conversation context provided and the evaluation score to determine the patient's level of depression. Then, write a response reflecting on the patient's mental state, the severity of depression based on the score, and offer some suggestions or recommendations accordingly.

            Below is the scale for interpreting the BDI score:

            INTERPRETING THE BECK DEPRESSION INVENTORY:

            1-10: These ups and downs are considered normal
            11-16: Mild mood disturbance
            17-20: Borderline clinical depression
            21-30: Moderate depression
            31-40: Severe depression
            Over 40: Extreme depression

            Conversation History:
            ${context}\n\n

            Score:
            '${score}'

            Based on the context and score, reflect on the patient's emotional well-being, determine their level of depression from the scale above, and provide a supportive response. Include any helpful suggestions or recommendations that could aid the patient in managing their mental health. Do not make the analysis too long and respond with plain string it will be handled with program`
        );
    } catch (error) {
        throw error;
    }
    return response;
}
