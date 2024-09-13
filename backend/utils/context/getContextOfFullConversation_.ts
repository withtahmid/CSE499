import { ConversationSchema } from "../../models/Conversation"

export const getContextOfFullConversation = (conversation: ConversationSchema): string => {
    let context = "";
    conversation.messages.forEach(({ sender, text, isConfirmation }) => {
        if(!isConfirmation){
            context += `"${sender}": "${text}"\n`
        }
    })
    return context;
}