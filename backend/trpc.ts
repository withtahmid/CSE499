import { inferAsyncReturnType, initTRPC, TRPCError } from "@trpc/server";
import { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import Conversation, { ConversationSchema } from "./models/Conversation";
import dotenv from "dotenv"
dotenv.config();
export const createContext = async (opts: CreateExpressContextOptions) => {
    const { req, res } = opts;
    try {
        var conversationId = req.headers.authorization?.split(' ')[1];
        var conversation = conversationId ? await retriveConversationFromId(conversationId) : null;
    } catch (error) {
        conversation = null;
    }

    const isAdmin = process.env.ADMIN_KEY === conversationId;
    return { req, res, conversation, isAdmin };
}

const retriveConversationFromId = async (conversationId: string): Promise<ConversationSchema | null> => {
    const conversation = await Conversation.findById(conversationId).populate("messages").exec();
    if (!conversation) {
        return null;
    }
    return conversation;
}

type Context = inferAsyncReturnType<typeof createContext>;

const t = initTRPC.context<Context>().create();

export const router = t.router;
export const publicProcedure = t.procedure;
export const adminProcedure = t.procedure.use(async ({ ctx, next }) => {
    if (!ctx.isAdmin) {
        throw new TRPCError({ code: "UNAUTHORIZED", message: "Only an admin can access this route" });
    }
    const result = await next({ ctx: { ...ctx, conversation: null } });
    return result;
});
export const protectedProcedure = t.procedure.use(async ({ ctx, next }) => {
    if (ctx.conversation === null) {
        throw new TRPCError({ code: "UNAUTHORIZED", message: "Conversation is not found to proceed" });
    }
    const result = await next({ ctx: { ...ctx, conversation: ctx.conversation as ConversationSchema } });
    try {
        await ctx.conversation.save();
    } catch (error) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Failed to save conversation into database" });
    }
    return result;
});