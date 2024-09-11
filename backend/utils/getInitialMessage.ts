import { executePrompt } from "../llm/gemini"
export const getInitialMessage = async(text: string) => {
    try {
        var response = await executePrompt(`
            The following is the first message from a user in a chatbot conversation where the user will be gone through a series of self-evaluating questions based on the Beck's Depression Inventory (BDI) to assess their mental health. Acknowledge the user's initial message warmly, and then gently transition to the first question: "How sad do you feel?" Make sure to use a soft and empathetic tone to make the user feel comfortable. Just ask the question,  do not add options or explain why asking the question.
            Example: 
                'User': 'Hello',
                'Assistant': 'Hello! I'm here to help you assess your mental health using the Beck's Depression Inventory. I'll ask you a few questions, and your will help you gain insights into your current well-being. Let's start with the first question: How sad do you feel?'
            UserMessage: ${text}`
        );
    } catch (error) {
        throw error;
    }
    return response;
}
