
import { TRPCError } from "@trpc/server";
import Conversation, { ConversationSchema } from "../models/Conversation";
import { adminProcedure } from "../trpc";
import { z } from "zod"

const getAllConversationProcedure = adminProcedure
    .query(async ({ ctx }) => {
        try {
            const mongooseDocs = await Conversation.find();
            var conversations = mongooseDocs.map(doc => doc.toObject());
        } catch (error) {
            throw new TRPCError({ message: "Failed to retrive conversations", code: "INTERNAL_SERVER_ERROR" });
        }
        return conversations as ConversationSchema[];
    });

export default getAllConversationProcedure;