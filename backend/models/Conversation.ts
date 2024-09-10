import { Schema, model,Types } from "mongoose";
import { MessageSchema } from "./Message"

export interface ConversationSchema{
    _id: Types.ObjectId;
    currentIndex: number;
    messages: MessageSchema[];
    scores: number[];
    metadata: string[];
}
const conversationModel = new Schema<ConversationSchema>({
    currentIndex: { type: Number },
    messages: [ { type: Schema.Types.ObjectId, ref: 'Message' } ],
    scores: [ { type: Number  } ],
    metadata: [ { type:String }]
});

const Conversation = model("Conversation", conversationModel);
export default Conversation;