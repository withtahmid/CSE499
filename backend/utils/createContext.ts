import { ConversationSchema } from "../models/Conversation";
import { BDI_Questions } from "../data/bdi";
export const createContextForLLM = (conversation: ConversationSchema): string => {
    let context:string = "";
    // conversation.scores.forEach(({ questionIndex, score }) => {
    //     context += `\n\n'Assistant': '${BDI_Questions[questionIndex].question}'\n 'Patient': '${BDI_Questions[questionIndex].answers[score]}'`;
    // })
    conversation.contextForLLM.forEach( ({ sender, text }) => {
        context += `\n'${sender}': '${text}'${sender === "Patient" ? "\n" : ""}`;
    })
    return context;
}