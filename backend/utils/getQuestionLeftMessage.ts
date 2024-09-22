import { ConversationSchema } from "../models/Conversation";
import { BDI_Questions } from "../data/bdi"
export const getQuestionLeft = (ci: number) => {
    const questionLeft = BDI_Questions.length - ci;
    let text:string = "";
    if(ci === 19){
        text = "We have came to the end, 2 more question";
    }
    else if(ci == 15){
        text = `We are almost there, ${questionLeft} more questions left`;
    }
    else if(ci === 10){
        text = `We are halfway there, ${questionLeft} more questions left`;
    }
    return text;
}