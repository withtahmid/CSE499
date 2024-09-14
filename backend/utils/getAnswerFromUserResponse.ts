import { executePrompt } from "../llm/gemini";
import { QuestionSchema } from "../models/Message";
import { getPromtToAnalyzeUserRespnse } from "./prompts/getPromtToAnalyzeUserRespnse";
export const  getAnswerFromUserResponse = async (question:QuestionSchema, text: string,  context: string) => {
    const prompt = getPromtToAnalyzeUserRespnse(context);
    // const prompt = getPrompt(question, text);
    try {
        var response = await executePrompt(prompt);
    } catch (error) {
        console.log(error);
        response = "X";
    }
    const prediction = response === "A" ? 0 : response == "B" ? 1 : response === "C" ? 2 : response === "D" ? 3 : response === "X" ? -1 : undefined; 
    return prediction;
}


const getPrompt = (question_: QuestionSchema, text:string) => {
    const { question, answers } = question_;

    const prompt =`Task Instruction:

        You are given a question <Q> and four possible answers <A>, <B>, <C>, <D>. The question was originally asked to a patient, and the patient's response is given as <patient_answer>. Your task is to find which of the four answers <A>, <B>, <C>, <D> most closely matches the meaning of the patient's response. The match does not have to be word-for-word, but should reflect the closest meaning to the provided answers. 

        Actual Values: 
            '<Q>' : '${question}',
            '<A>': '${answers[0]}',
            '<B>': '${answers[1]}',
            '<C>': '${answers[2]}',
            '<D>': '${answers[3]}',
            '<patient_answer>' : '${text}'

        Follow these conditions:

        Condition 1: If none of the answers match or the <patient_answer> is not relevant to the question <Q>, respond by a digit 'X'.
        
        Condition 2: If a match is found, reply with the corresponding number of the answer:
        - 'A' for '<A>'
        - 'B' for '<B>'
        - 'C' for '<C>'
        - 'D' for '<D>'


        Make sure your response will either be one of the character 'A', 'B', 'C', or 'D', or 'X' in case none of the answer is matched.

        Your response will be evaluated by the following JavaScript Code: "
            if(response === "A" || response === "B" || response === "C" || response === "D"){
                answerFound(response);
            }else if(response === "X"){
                irrelaventAnswer(response);
            }else{
                //unexpected response
                throw new Error();
            }
        "
        Response must be just one character without any special character or quotations.

        `
    return prompt;
}