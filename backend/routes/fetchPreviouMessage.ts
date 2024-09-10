
import { TRPCError } from "@trpc/server";
import Conversation from "../models/Conversation";
import Message, { MessageSchema } from "../models/Message";
import { publicProcedure } from "../trpc";
import { z } from "zod"
import { BDI_Questions } from "../data/bdi"
const Inputschema = z.object({
    text: z.string().min(1).max(200),
    conversationId: z.string().length(24),
})
const fetchPreviousProcedure = publicProcedure
.input(z.object({conversationId: z.string().length(24)}))
.query(async( { input, ctx } ) => {
    const conversation = await Conversation.findById(input.conversationId).populate("messages").exec();    
    if(!conversation){
        throw new TRPCError({ message: "Incorrect Conversation Id", code:"NOT_FOUND" });
    }
    return conversation.messages as MessageSchema[];
});

export default fetchPreviousProcedure;