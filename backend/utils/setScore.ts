import { ConversationSchema } from "../models/Conversation";
export const setScore = async (conversation: ConversationSchema, index: number, score: number) =>{
    const existingIndex = conversation.scores.findIndex( score => score.questionIndex === index);
    if(existingIndex === -1){
        console.log(`Faild to set score for index ${index}`);
    }else{
        conversation.scores[existingIndex].score = score;
        conversation.scores[existingIndex].endTime = Date.now();
    }
}