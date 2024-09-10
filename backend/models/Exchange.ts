import { Schema, model } from "mongoose";

export interface ExchangeSchema {
    index: number;
    patient: string;
    assistant: string;
    initiateTime: Date;
    resolveTime: Date;
}

const exchangeMOdel = new Schema<ExchangeSchema>({ 
    index: { type: Number, required: true },
    patient: String,
    assistant: String,
    initiateTime: { type: Date, required: true, default: Date.now() },
    resolveTime: Date,
});

const Exchange = model("Exchange", exchangeMOdel);
export default Exchange;