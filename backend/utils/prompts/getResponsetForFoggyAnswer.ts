import { executePrompt } from "../../llm/gemini";
import { QuestionSchema } from "../../models/Message";

export const generateResponseForFoggyResponse = async (question_: QuestionSchema, history: string) => {
    const { question, answers }  = question_;
    const prompt =`
    
    Prompt:
    You are a mental health assistant conducting a conversation with a patient, asking them questions from the Beck Depression Inventory (BDI).Below is a conversation between you as 'Assistant' and the patient as 'Patient'. At first you have asked the patiest a question and given 4 possible answers and they are 'A', 'B', 'C', 'D'. 

     Conversation History: 
    ${history}\n\n
    
    From the patient's responses you think the patient's responses does not aline with only one of the possible answers 'A', 'B', 'C', 'D'. It is fuzzy or confusing. Your task is to add a polite response on patient's answer then with a smooth transiton ask the same question again without saynig that it is confusing.  It should be like a normal conversation. Convince the patient to resonse ('A', 'B', 'C', 'D') from first message of 'Assistant' only. Do not ask question other than 'A', 'B', 'C', 'D'.

    Output format: 

    Return a plain string text. Do not add any quotations or special characters. Do not  make any sections.

    Do not use quotations.

    `
    try {
        var response = await executePrompt(prompt);
    } catch (error) {
        console.log(error);
        return `I am not sure which answer suits with your response, can you please clarify your answer for the question "${question}"`;
    }
    return response;
};