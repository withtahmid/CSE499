import  {ConversationSchema } from  "../models/Conversation"
export const printAnalysis = (conversation: ConversationSchema) =>{

    console.log("\n\n--------------------- [ START ] ----------------------------\n");

    // conversation.scores.forEach(score => {
    //     if(score.endTime > 0){
    //         console.log(`Index: ${score.questionIndex}, score: ${score.score}, time: ${(score.endTime - score.startTime) / 1000}`)
    //     }
    // });

    console.log(`Current Question: ${conversation.currentIndex}, Total Score: ${conversation.scores.reduce((acc, current) => acc + current.score, 0)}`)
    console.log("\n---------------------- [ END ] -----------------------------\n");
}