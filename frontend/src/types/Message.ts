import { ConfirmationDetailsSchema } from "./ConfirmationDetails";
import QuestionSchema from "./Question";
import { ReportSchema } from "./Report";
export default interface MessageSchema {
    _id: string;
    sender: "Patient" | "Assistant";
    text: string;
    timestamp: number;
   
    question?: QuestionSchema,
   
    isConfirmation?:boolean; 
    confirmationDetails?: ConfirmationDetailsSchema;

    isReport?: boolean; 
    reportDetails?: ReportSchema;
}
