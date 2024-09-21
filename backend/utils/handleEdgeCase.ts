// import { BDI_Questions } from "../data/bdi";
// import { ConversationSchema } from "../models/Conversation";
// import { getInitialMessage } from "./getInitialMessage";
// import { getPostMessage } from "./postMessage";

// export const handleEdgeCase = async (conversation: ConversationSchema, text: string): Promise<string> => {
//     let botResponse:string;
//     if(conversation.currentIndex === -1){
//         botResponse = await getInitialMessage(text);
//     }else if (conversation.currentIndex >= BDI_Questions.length){
//         botResponse = await getPostMessage(conversation);
//     }else{
//         throw new Error("Unreachable code area")
//     }
//     return botResponse;
// }