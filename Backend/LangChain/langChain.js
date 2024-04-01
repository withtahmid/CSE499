
import config from '../config.js';

const { AI_Character, Human_Character, initialPrompt } = config;

function newMessage(text, sender){
    if(sender != AI_Character && sender != Human_Character){
        console.error(`User must be ${AI_Character} or ${Human_Character}`);
        return;
    }
    return {
        text: text, sender: sender
    }
}

class LangChain{
    constructor(){
        this.chatHistory = [];
        this.summary = '';
    }
    add_AI_response(text){
        this.chatHistory.push(newMessage(text, AI_Character));
    }
    add_user_response(text){
        this.chatHistory.push(newMessage(text, Human_Character));
    }
    summerize(){
        // 
    }
    getPrompt(){
        let prompt = initialPrompt;
        this.chatHistory.forEach((message) => {
            prompt += `\n${message.sender}: ${message.text}` + `The AI must not finish the conversation saying something like "Is there anything I can help you with today?" Never. It will keep responding.`;
        })
        return prompt;
    }
}

export default LangChain;