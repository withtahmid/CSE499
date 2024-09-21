import { executePrompt } from "../llm/gemini"
import { ConversationSchema } from "../models/Conversation";
import { getContextByScores } from "./context/getContextForNextQuestion";
import { createContextForLLM } from "./createContext";
import { getDepressionLevel } from "./helper-functions/parseReport"
export const getReport = async(conversation: ConversationSchema) => {
    const context = getContextByScores(conversation);
    const { score, depressionLevel } = getDepressionLevel(conversation);
    
    const prompt = `
        Prompt:
        You are a mental health assistant asked sevaral mental health evaluation questions to your paiesnt from Beck Depression Inventory (BDI). The question answer session is over. Below is the Question-Answer-History provided. The patient's mel=ntal state according to their answers using BDI is provided as <MENTAL-HEALTH-STATE> 
            
        Question-Answer-History:
        ${context}\n\n

        MENTAL-HEALTH-STATE
        ${depressionLevel}

        The questioning is over. Now you will comment on the patient's mental health state according to their responses and suggest any helpful suggestions or recommendations that could aid the patient in managing their mental health.
        If the patient has depression suggest them to take professional help.

        Output length and tone:
        Response should be a few sentenses long and sound like a professional mental health asistant is telling the report. Tone should be warm and formal.

        Sentense stracture should be You are the Mental-health assistant and talking to the patient.

        Don't mention the MENTAL-HEALTH-STATE in the suggesstion. Use it to make the suggession relevent.

        Output Format: 
        Output should be a plain string. Do not make sections. Do not use quotations or special characters.
        `;

        try {
            var comment = await executePrompt(prompt);
        } catch (error) {
            console.log(error);
            comment = "";
        }
        return { score, depressionLevel, comment };
}
