import { ConversationSchema } from "../../models/Conversation"
import { Depression_Level } from "../../data/bdi"
const calculateScore = (conversation: ConversationSchema) => {
    return conversation.scores.reduce((acc, current) => acc + current.score, 0)
}

export const getDepressionLevel = (conversation: ConversationSchema) => {
    const score = calculateScore(conversation);

    let depressionLevel:Depression_Level;
    if(score > 40){
        depressionLevel = "Extreme depression";
    }else if(score >= 31){
        depressionLevel = "Severe depression";
    }else if(score >= 21){
        depressionLevel = "Moderate depression";
    }else if(score >= 17){
        depressionLevel = "Borderline clinical depression";
    }else if(score >= 11){
        depressionLevel = "Mild mood disturbance";
    }else{
        depressionLevel = "Normal ups and downs";
    }

    return { score, depressionLevel };

}