import { ConversationSchema } from "../models/Conversation";
export const setScore = (conversation: ConversationSchema, index: number, score: number) =>{
    const existingIndex = conversation.scores.findIndex( score => score.questionIndex === index);
    if(existingIndex === -1){
        console.log(`Faild to set score for index ${index}`);
    }else{
        conversation.scores[existingIndex].score = score;
        conversation.scores[existingIndex].endTime = Date.now();
    }
    conversation.obtainedScore = conversation.scores.reduce((acc, current) => acc + current.score, 0);
}