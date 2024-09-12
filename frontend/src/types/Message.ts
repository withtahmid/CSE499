import QuestionSchema from "./Question";
export default interface MessageSchema {
    _id: string;
    sender: "Patient" | "Assistant";
    text: string;
    timestamp: number;
    question?: QuestionSchema,
    isConfirmation?:boolean; 
}
