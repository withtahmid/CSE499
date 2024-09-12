import { Schema, model, Types } from "mongoose";

export interface QuestionSchema{ 
    question: string,
    answers: string[];
 }

export interface MessageSchema {
    _id: Types.ObjectId;
    sender: "Patient" | "Assistant";
    text: string;
    timestamp: number;
    question?: QuestionSchema;
    isConfirmation?: boolean;
}

const messageModel = new Schema<MessageSchema>({
    sender: { type: String, required: true },
    text: { type: String, required: true },
    timestamp: { type: Number, required: true, default: Date.now },
    question: { 
        question: { type: String },
        answers: [ { type: String } ]
     },
     isConfirmation: { type: Boolean, default: false },
})

const Message = model("Message", messageModel);
export default Message;