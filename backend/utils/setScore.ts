import { ConversationSchema } from "../models/Conversation";

export const setScore = async (conversation: ConversationSchema, index: number, score: number) =>{
    const existingIndex = conversation.scores.findIndex( score => score.questionIndex === index);
    if(existingIndex === -1){
        conversation.scores.push({ questionIndex: index, score: score });
    }else{
        conversation.scores[existingIndex].score = score;
    }
}