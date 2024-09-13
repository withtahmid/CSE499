import { Schema, model, Types, Document } from "mongoose";

export interface QuestionSchema{ 
    question: string,
    answers: string[];
 }

export interface ConfirmationDetailsSchema{
    index: number;
    question: string
    answer: string, 
    score: number,
    confirmed: boolean,
};

export interface MessageSchema extends Document{
    _id: Types.ObjectId;
    sender: "Patient" | "Assistant";
    text: string;
    timestamp: number;
    question?: QuestionSchema;
    isConfirmation?: boolean;
    confirmationDetails?: ConfirmationDetailsSchema;
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
    confirmationDetails: { 
        type: new Schema({
            index: { type: Number, required: true },
            question: { type: String, required: true },
            answer: { type: String, required: true }, 
            score: { type: Number, required: true },
            confirmed: { type: Boolean, required: true , default: false }
        }, { _id: false }),
        required: false
    }
});

const Message = model("Message", messageModel);
export default Message;