import { ConversationSchema } from "../../models/Conversation";


export const generateCurrentQuestionContext = (conversation :ConversationSchema):string => {
    let context:string = "";
    conversation.currentQuestionContext.forEach(message => {
        context += `'${message.sender}': '${message.text}'\n\n`
    })
    return context;
} 