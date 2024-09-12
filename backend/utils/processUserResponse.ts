import { ConversationSchema } from "../models/Conversation";
import { BDI_Questions } from "../data/bdi";
import { executePrompt } from "../llm/gemini";
import { checkConfidence } from "./checkConfidence";
import { QuestionSchema } from "../models/Message";
import { generateResponseForFoggyResponse } from "./prompts/getResponsetForFoggyAnswer";
import { generateResponseForIrrelaventResponse } from "./prompts/getResponseForIrrelevantAnswer";
import { generateCurrentQuestionContext } from "./context/generateCurrentQuestionContext";
import { getPromtToAnalyzeUserRespnse } from "./prompts/getPromtToAnalyzeUserRespnse";

const getPrompt = (index: number, text:string) => {
    if(index >= BDI_Questions.length) return "";
    const { question, answers } = BDI_Questions[index];

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
// respond by politely acknowleding patient's response, show sympathy if needed and blend the same question in the response with no more than 2 lines. Use a soft and empathetic tone.

interface PatientResponseReport{
    score?: number;
    followedQuestion?: string;
    isConfident?: boolean;
}

export const processUserResponse = async (conversation: ConversationSchema, text: string, index: number | undefined): Promise<PatientResponseReport> => {

    if(conversation.currentIndex === BDI_Questions.length){
        return {};
    }

    if(index != undefined && ( 0 > index || index > 3)){
        throw new Error (`Invalid index found. Index: ${index}`)
    }

    const question = BDI_Questions[conversation.currentIndex];

    if(index != undefined){
        return { score: index, isConfident: true };
    }

    const possibleIndex = question.answers.findIndex((answer) => answer === text);
    
    if(possibleIndex != -1){
        return { score: possibleIndex, isConfident: true };
    }

    const currentQuestionContext = generateCurrentQuestionContext(conversation);

    const prompt = getPromtToAnalyzeUserRespnse(currentQuestionContext);
    // const prompt = getPrompt(conversation.currentIndex, text);

    try {
        
        var [ response , confidence ] = await Promise.all([executePrompt(prompt), checkConfidence(question, text, currentQuestionContext)]);
        console.log(`Response: ${response}`)
    } catch (error) {
        console.log(error);
        return  { followedQuestion: "I think I am not sure if I have understood your answer. Can you please clarify again?" };
    }

    

    const prediction = response === "A" ? 0 : response == "B" ? 1 : response === "C" ? 2 : response === "D" ? 3 : response === "X" ? -1 : undefined; 
    const max_indexes = confidence.map((value: number, index: number) => value === Math.max(...confidence) ? index : -1).filter(index => index !== -1);
    const isFoggy = max_indexes.length != 1 || max_indexes[0] != prediction;
    const isIrrelavent = prediction === -1 || !response;
    console.log(confidence, prediction)
    if(isIrrelavent){
        console.log("Answer is irrelavent");
        const followedQuestion = await generateResponseForIrrelaventResponse(question, currentQuestionContext);
        return  { followedQuestion};
    }
    else if(isFoggy){
        const followedQuestion = await generateResponseForFoggyResponse(question, currentQuestionContext);
        console.log("Answer is foggy");
        return  { followedQuestion };
    }else{
        return { score: prediction, isConfident: false };
    }
}