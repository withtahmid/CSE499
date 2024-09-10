import { publicProcedure } from "../trpc";
import { z } from "zod"
import Conversation, { ConversationSchema } from "../models/Conversation";

const schema = z.object({
    metadata: z.array(z.string())
})

const startProcedure = publicProcedure
.input(schema)
.mutation(async( { input, ctx } ) => {
    
    const newConversation = new Conversation({
        currentIndex: 0,
        scores: [],
        exchanges: [],
        metadata: input.metadata,
        initiateTime: Date.now()
    });
    
    await newConversation.save();
    return newConversation._id;
});

export default startProcedure;