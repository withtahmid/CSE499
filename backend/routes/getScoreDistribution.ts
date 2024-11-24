
import { TRPCError } from "@trpc/server";
import Conversation from "../models/Conversation";
import Message, { MessageSchema } from "../models/Message";
import { protectedProcedure, publicProcedure } from "../trpc";
import { z } from "zod"
import { BDI_Questions } from "../data/bdi"
const Inputschema = z.object({
    text: z.string().min(1).max(200),
    conversationId: z.string().length(24),
})
const getScoreDistribution = protectedProcedure
.query(async( { ctx } ) => {
    const { conversation } = ctx;
    return {
        messages: conversation.messages as MessageSchema[],
        isFinished: conversation.isFinished as boolean,
    }
    // return conversation.messages as MessageSchema[];
});

export default getScoreDistribution;