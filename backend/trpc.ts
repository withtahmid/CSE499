import { inferAsyncReturnType, initTRPC, TRPCError } from "@trpc/server";
import { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import Conversation, { ConversationSchema } from "./models/Conversation";
export const createContext = async (opts: CreateExpressContextOptions) => {
    const { req, res } = opts;
    try {
        const conversationId = req.headers.authorization?.split(' ')[1];
        var conversation = conversationId ? await retriveConversationFromId(conversationId) : null;
    } catch (error) {
        console.log(error)
        conversation = null;
    }
    return { req, res, conversation};
}

const retriveConversationFromId = async (conversationId: string): Promise<ConversationSchema | null> => {
    const conversation = await Conversation.findById(conversationId).populate("messages").exec();
    if(!conversation){
        return null;
    }
    return conversation;
}

type Context = inferAsyncReturnType<typeof createContext>;

const t = initTRPC.context<Context>().create();

export const router = t.router;
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use( async( { ctx, next }) => {
    if(ctx.conversation === null){
        throw new TRPCError({code: "UNAUTHORIZED"});
    }
    const result = await  next({ ctx: { ...ctx, conversation: ctx.conversation as ConversationSchema } });
    try {
        await ctx.conversation.save();
    } catch (error) {
        throw new TRPCError({code: "INTERNAL_SERVER_ERROR", message: "Failed to save conversation into database"});
    }
    return result;
});