import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// const state = `If I do not feel sad, or if I feel sad, or if I am sad all the time and I can't snap out of it, or if I am so sad and unhappy that I can't stand it.`

const prompt = `From now on you will act as a mental heath support assistant and response as a human. Furthur messages will come from an user. You will try to get answers of 'Beck Depression Inventory' to examine the users depression level.You won't ask for permission to ask these questions. Do not mention you are using 'Beck Depression Inventory'. Your response must be focused on getting the 'Beck Depression Inventory'. You must not change conversation topic. If you find the conversation is ending, try not to end it and stick to the topic`;

const model = genAI.getGenerativeModel({ model: "gemini-pro"});
const conversation = model.startChat({
    history: [
        {
        role: "user",
        parts: [{ text: prompt}],
        },
        
        {
        role: "model",
        parts: [{ text: `Hi! I am here to listen you and will try to understand your state of mind.` }],
        },

    ],
    generationConfig: {
        maxOutputTokens: 100,
    },
});

async function chat(msg){
    try{
        const result = await conversation.sendMessage(msg);
        const response = await result.response;
        const text = response.text();
        return text;
    }
    catch(e){
        console.error(e);
        return `Error on the backend :'(`
    }
}

async function executePrompt(prompt){
    const result = await model.generateContent(prompt);
    const textResponse = result.response.text()
    return textResponse;   
}

export default {
    chat,
    executePrompt,
}