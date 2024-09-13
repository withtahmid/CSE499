import { Schema, model,Types, Document } from "mongoose";
import { MessageSchema } from "./Message"

export interface ScoreSchema {
    questionIndex: number;
    score: number;
}

export interface ConversationSchema extends Document{
    _id: Types.ObjectId;
    currentIndex: number;
    messages: MessageSchema[];
    scores: ScoreSchema[];
    metadata: string[];
    contextForLLM: [ {
        sender: "Patient" | "Assistant";
        text: string;
    } ];

    currentQuestionContext: [{
        sender: "Patient" | "Assistant";
        text: string;
    }]

}

const conversationModel = new Schema<ConversationSchema>({
    currentIndex: { type: Number },
    messages: [ { type: Schema.Types.ObjectId, ref: 'Message' } ],
    scores: [ 
        { 
            questionIndex: { type: Number, required: true },
            score: { type: Number, required: true },
        } 
    ],
    contextForLLM: [{
    
        sender: { type: String, required: true },
        text: { type: String, required: true },
    
    }],
    
    currentQuestionContext: [{
        sender: { type: String, required: true },
        text: { type: String, required: true },
    
    }],

    metadata: [ { type:String }]
});

const Conversation = model("Conversation", conversationModel);
export default Conversation;