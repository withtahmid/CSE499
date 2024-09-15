import { BDI_Questions } from "../data/bdi";
import { executePrompt } from "../llm/gemini"
import { ConversationSchema } from "../models/Conversation";
import { getContextOfFullConversation } from "./context/getContextOfFullConversation_";
export const getInitialMessage = async(conversation: ConversationSchema) => {


    const history = getContextOfFullConversation(conversation);
    console.log(history)

    const prompt = `
        Situation: 
        You are a mental health assistant conducting a conversation with a patient, and about to ask them questions from the Beck Depression Inventory (BDI) so user will be gone through a series of self-evaluating questions based on the Beck's Depression Inventory (BDI) to assess their mental health. The following is the first message exchange from the patient and you. 
        
        Conversation-History: 
        ${history}

        Task:
        Acknowledge the user's initial message warmly, and then gently transition to the first question: "How sad do you feel?" Make sure to use a soft and empathetic tone to make the user feel comfortable. Just ask the question,  do not add options or explain why asking the question.
        
        Example: 
            
        'Hello! I'm here to help you assess your mental health using the Beck's Depression Inventory. I'll ask you a few questions, and your will help you gain insights into your current well-being. Let's start with the first question: How sad do you feel?'

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
