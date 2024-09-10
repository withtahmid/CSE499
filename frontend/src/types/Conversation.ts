import MessageSchema from "./Message";
export interface ConversationSchema{
    _id: string;
    currentIndex: number;
    messages: MessageSchema[];
}