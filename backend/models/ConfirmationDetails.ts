import { Schema, model, Types, Document } from "mongoose";
export interface ConfirmationDetailsSchema extends Document{
    _id: Types.ObjectId;
    score: number;
    confirmed: boolean;
    question: string;
    predictedAnswer?: string;
    confirmedAnswer?: string;
};

const confirmationDetailsSchema = new Schema<ConfirmationDetailsSchema>({
    score: { type: Number, required: true },
    confirmed: { type: Boolean, required: true },
    question: { type: String, required: true },
    predictedAnswer: { type: String, required: true },
    confirmedAnswer: { type: String }
});

const ConfirmationDetails = model("ConfirmationDetails", confirmationDetailsSchema);
export default ConfirmationDetails; 
