import { ConversationSchema } from "../models/Conversation";
import { BDI_Questions } from "../data/bdi"
import { getContextOfFullConversation } from "./context/getContextOfFullConversation_";
export const getQuestionLeft = (conversation: ConversationSchema) => {
    const context = getContextOfFullConversation(conversation);
    
}