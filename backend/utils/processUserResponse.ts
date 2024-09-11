import { ConversationSchema } from "../models/Conversation";
import { BDI_Questions } from "../data/bdi";
import { executePrompt } from "../llm/gemini";
import { createContextForLLM } from "./createContext";
const getPrompt = (index: number, text:string) => {
    if(index >= BDI_Questions.length) return "";
    const { question, answers } = BDI_Questions[index];

const prompt =
`Task Instruction:

You are given a question <Q> and four possible answers <A0>, <A1>, <A2>, <A3>. The question was originally asked to a patient, and the patient's response is given as <patient_answer>. Your task is to find which of the four answers <A0>, <A1>, <A2>, <A3> most closely matches the meaning of the patient's response. The match does not have to be word-for-word, but should reflect the closest meaning to the provided answers. 

Actual Values: 
    '<Q>' : '${question}',
    '<A0>': '${answers[0]}',
    '<A1>': '${answers[1]}',
    '<A2>': '${answers[2]}',
    '<A3>': '${answers[3]}',
    '<patient_answer>' : '${text}'

Follow these conditions:

Condition 1: If none of the answers match or the <patient_answer> is not relevant to the question <Q>, respond by politely acknowleding patient's response, show sympathy if needed and blend the same question in the response with no more than 2 lines. Use a soft and empathetic tone.
   
Condition 2: If a match is found, reply with the corresponding number of the answer:
   - '0' for '<A0>'
   - '1' for '<A1>'
   - '2' for '<A2>'
   - '3' for '<A3>'

Make sure your response will either be one of the numbers '0', '1', '2', or '3', or a gentle re-asking of the question.
This will allow the LLM to follow the given conditions and interact empathetically in case of an irrelevant or unclear response.

Your response will be evaluated by the following JavaScript Code: "
    if(response === "0" || response === "1" || response === "2" || response === "3"){
        answerFound(response);
    }else{
        answerNotFound(response);
    }
"
`
return prompt;
}

interface PatientResponseReport{
    score?: number;
    followedQuestion?: string;
    isConfident?: boolean;
}

export const processUserResponse = async (conversation: ConversationSchema, text: string, index: number | undefined): Promise<PatientResponseReport> => {
    
    
    if(conversation.currentIndex === BDI_Questions.length){
        return {};
    }
    
    if(index && ( 0 <= index && index <= 3)){
        return { score: index, isConfident: true };
    }
    const context = createContextForLLM(conversation)
    
    const prompt = getPrompt(conversation.currentIndex, text);
    
    try {
        var response = await executePrompt(prompt);
    } catch (error) {
        throw error;
    }
    const score = response === "0" ? 0 : response == "1" ? 1 : response === "2" ? 2 : response === "3" ? 3 : undefined;
    const followedQuestion = score != undefined ? undefined : response;
    return { score, followedQuestion, isConfident: false };

}