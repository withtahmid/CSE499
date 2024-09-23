import { ConversationSchema } from "../models/Conversation";
import { executePrompt } from "../llm/gemini";
import { BDI_Questions } from "../data/bdi";
import { getPromptForNextQuestion, getPromptForNextQuestionWithXQuestionLext } from "./prompts/getPromptForNextQuestion"
export const getNextQuestion = async (conversation: ConversationSchema): Promise < string > => {
    
    const question = BDI_Questions[conversation.currentIndex];
    
    if((Math.floor(Math.random() * 21) + 1) <= 5){ // probability 5/21
        console.log("with x question");
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