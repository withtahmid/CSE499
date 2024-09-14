import { ConversationSchema } from "../models/Conversation";
import { BDI_Questions } from "../data/bdi";
import { executePrompt } from "../llm/gemini";
import { checkConfidence } from "./checkConfidence";
import { QuestionSchema } from "../models/Message";
import { generateResponseForFoggyResponse } from "./prompts/getResponsetForFoggyAnswer";
import { generateResponseForIrrelaventResponse } from "./prompts/getResponseForIrrelevantAnswer";
import { generateCurrentQuestionContext } from "./context/generateCurrentQuestionContext";
import { getPromtToAnalyzeUserRespnse } from "./prompts/getPromtToAnalyzeUserRespnse";

import { getAnswerFromUserResponse } from "./getAnswerFromUserResponse";

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

    // Checking if text matches exactly with any of the possible answers
    const possibleIndex = question.answers.findIndex((answer) => answer === text);
    if(possibleIndex != -1){
        return { score: possibleIndex, isConfident: true };
    }


    // Checking if text contains direct the options
    const textLower = text.toLocaleLowerCase().trim();
    const directOption = textLower === "a" ? 0 : textLower === "b" ? 1 : textLower === "c" ? 2 : textLower === "d" ? 3 : null;
    if(directOption != null){
        return { score: directOption, isConfident: true };
    }

    // Checking manually using Gemini
    const currentQuestionContext = generateCurrentQuestionContext(conversation);
    const [ prediction , confidence ] = await Promise.all([ getAnswerFromUserResponse(question, text, currentQuestionContext), checkConfidence(question, text, currentQuestionContext)]);

    const max_indexes = confidence.map((value: number, index: number) => value === Math.max(...confidence) ? index : -1).filter(index => index !== -1);
    
    const isFoggy = max_indexes.length != 1 || max_indexes[0] != prediction;
    const isIrrelavent = prediction === -1 || prediction === undefined;
    
    console.log(confidence, prediction, ` | Irrelevant:`,isIrrelavent, `Confusing:`, isFoggy)
    
    if(isIrrelavent){
        const followedQuestion = await generateResponseForIrrelaventResponse(question, currentQuestionContext);
        return  { followedQuestion};
    }
    else if(isFoggy){
        const followedQuestion = await generateResponseForFoggyResponse(question, currentQuestionContext);
        return  { followedQuestion };
    }else{
        return { score: prediction, isConfident: false };
    }
}