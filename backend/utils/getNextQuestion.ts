import { ConversationSchema } from "../models/Conversation";
import { executePrompt } from "../llm/gemini";
import { BDI_Questions } from "../data/bdi";
import { getPromptForNextQuestion, getPromptForNextQuestionWithXQuestionLext } from "./prompts/getPromptForNextQuestion";

const coinToss = (): boolean => {
    return Math.floor(Math.random() * 100) < 50;
}

const tellXQuestionLeft = (conversation: ConversationSchema):boolean => {
    if(Math.abs(conversation.toldQuestionLeftIndex - conversation.currentIndex) < 5){
        return false;
    }
    return coinToss();
}

export const getNextQuestion = async (conversation: ConversationSchema): Promise < string > => {
    
    const question = BDI_Questions[conversation.currentIndex];
    
    if(tellXQuestionLeft(conversation)){
        console.log("with x question");
        conversation.toldQuestionLeftIndex = conversation.currentIndex;
        var diffPrompt = getPromptForNextQuestionWithXQuestionLext(conversation, question.question);
    }else{
        diffPrompt = getPromptForNextQuestion(conversation, question.question);
    }
    
    try {
        var response = await executePrompt(diffPrompt);
    } catch (error) {
        console.log(error);
        response =  `Alright! lets move on to the next question. ${question.question}`
    }
    
    conversation.scores.push({ questionIndex: conversation.currentIndex, score: 0, startTime: Date.now(), endTime: 0 });
    return response;

}