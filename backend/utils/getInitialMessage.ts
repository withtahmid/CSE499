import { BDI_Questions } from "../data/bdi";
import { executePrompt } from "../llm/gemini"
import { ConversationSchema } from "../models/Conversation";
import { getContextOfFullConversation } from "./context/getContextOfFullConversation_";
export const getInitialMessage = async(conversation: ConversationSchema) => {


    const history = getContextOfFullConversation(conversation);
    const prompt = `
        Prompt: 
        You are a mental health assistant conducting a conversation with a patient, going to ask them questions from the Beck Depression Inventory (BDI). The user will be gone through a series of self-evaluating questions based on the Beck's Depression Inventory (BDI) to assess their mental health. The following is the first message exchange from the patient and you. 
        
        Conversation-History: 
        ${history}

        Task:
        Acknowledge the user's initial message warmly, and then gently transition to the first question: "How sad do you feel?" Make sure to use a soft and empathetic tone to make the user feel comfortable. Just ask the question,  do not add options or explain why asking the question.
        
        Do not use quotations or special characters.

        `;

    try {
       var response = await executePrompt(prompt);

    } catch (error) {
        console.log(error);
        response = `Let's start with the first question. ${BDI_Questions[0].question}`
    }
    conversation.currentIndex = 0;
    conversation.scores.push({ questionIndex: conversation.currentIndex, score: 0, startTime: Date.now(), endTime: 0 });
    return response;
}
