import { ConversationSchema } from "../../models/Conversation";
import { BDI_Questions } from "../../data/bdi"
export const getContextByScores = (conversation: ConversationSchema):string => {
    let context = "";
    conversation.scores.forEach(({ questionIndex, score }) => {
        context += `'Assistant': '${BDI_Questions[questionIndex].question}'\n'Patient': '${BDI_Questions[questionIndex].answers[score]}'\n\n`;
    })
    return context;
} 