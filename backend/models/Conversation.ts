import { Schema, model,Types, Document } from "mongoose";
import { MessageSchema } from "./Message"

export interface ScoreSchema {
    questionIndex: number;
    score: number;
    startTime: number;
    endTime: number;
}

export interface DemographicInfoSchema {
    key: string;
    selected: string;
    otherValue: string;
}

export interface ConversationSchema extends Document{
    _id: Types.ObjectId;
    currentIndex: number;
    messages: MessageSchema[];
    scores: ScoreSchema[];
    metadata: string[];

    demographicInfos: DemographicInfoSchema[];
    feedback: number[];

    currentQuestionContext: [{
        sender: "Patient" | "Assistant";
        text: string;
    }];
    // 
    isFinished: boolean;
    startTime: number;
    endTime: number;
    toldQuestionLeftIndex: number;
}

const conversationModel = new Schema<ConversationSchema>({
    currentIndex: { type: Number },
    messages: [ { type: Schema.Types.ObjectId, ref: 'Message' } ],
    scores: [ 
        { 
            questionIndex: { type: Number, required: true },
            score: { type: Number, required: true },
            startTime: { type: Number, required: true },
            endTime: { type: Number },
        } 
    ],

    demographicInfos: [{
        key: { type: String, required: true },
        selected: { type: String, required: true },
        otherValue: { type: String }
    }],
    
    currentQuestionContext: [{
        sender: { type: String, required: true },
        text: { type: String, required: true },
    
    }],

    feedback: [ { type: Number, required: true } ],
 
    metadata: [ { type:String }],
    // 
    isFinished: { type: Boolean, required: true },
    startTime: { type: Number, required: true  },
    endTime: { type: Number,  },
    toldQuestionLeftIndex: { type: Number, required: true },
});

const Conversation = model("Conversation", conversationModel);
export default Conversation;