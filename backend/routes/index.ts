import { router } from "../trpc";
import startProcedure from "./startConversation";
import sendMessageProcedure from "./sendMessage";
import  fetchPreviousProcedure from "./fetchPreviouMessage"
export const appRouter = router({
    start: startProcedure,
    sendMessage: sendMessageProcedure, 
    fetchPrevious: fetchPreviousProcedure
});

export type AppRouter = typeof appRouter;