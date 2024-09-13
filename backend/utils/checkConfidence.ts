import { ConversationSchema } from "../models/Conversation";
import { BDI_Questions } from "../data/bdi";
import { executePrompt } from "../llm/gemini";
import { createContextForLLM } from "./createContext";
import { QuestionSchema } from "../models/Message";
import { getPromptToFindConfidence } from "./prompts/getPromptToFindConfidence";

const getPrompt = (question_: QuestionSchema, text:string ) => {
    const { question, answers } = question_;

const prompt =
`Task Instruction:

You are given a question <Q> and four possible answers <A>, <B>, <C>, <D>. The question was originally asked to a patient, and the patient's response is given as <patient_answer>. Your task is to score the four answers <A>, <B>, <C>, <D> between 0 an 1 according to how much the answer matches with <patient_answer> 

Actual Values: 
    '<Q>' : '${question}',
    '<A>': '${answers[0]}',
    '<B>': '${answers[1]}',
    '<C>': '${answers[2]}',
    '<D>': '${answers[3]}',
    '<patient_answer>' : '${text}'

The output should be JSON contaning JavaScript Array of number of size four containig values between 0 and 1 reflecting match score of the <patient_answer> with <A>, <B>, <C>, <D>.

    examples_1 : { "scores": [ 0.1, 0.0, 0.8, 0.1] }
    examples_2 : { "scores": [ 1, 0, 0, 0] }
    examples_3 : { "scores": [ 0.5, 0, 0, 0.5] }
    examples_4 : { "scores": [ 0.1, 0, 0, 0.1] }

Output a plain string without any quotes or any extra characters. Your response will be evaluated by the following JavaScript Code: "
    const json = JSON.parse(response);
    const scores: number[] = json["scores"];
`
return prompt;
}


export const checkConfidence = async (question:QuestionSchema, text: string, history: string) => {    
    const prompt = getPromptToFindConfidence(history);
    // const prompt = getPrompt(question, text);
    try {
        var response = await executePrompt(prompt);
        const json = JSON.parse(response);
        var scores: number[] = json["scores"];
    } catch (error) {
        return [ 0, 0, 0, 0 ];
    }
    if(!scores || !scores.length || !scores.map){
        return [ 0, 0, 0, 0 ];
    }
    return scores;
}