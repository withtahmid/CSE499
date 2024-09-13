import { router } from "../trpc";
import startProcedure from "./startConversation";
import sendMessageProcedure from "./sendMessage";
import  fetchPreviousProcedure from "./fetchPreviouMessage";
import adjustScoreProcedure from "./adjustScore";
export const appRouter = router({
    start: startProcedure,
    sendMessage: sendMessageProcedure, 
    fetchPrevious: fetchPreviousProcedure,
    adjustScore: adjustScoreProcedure,
});

export type AppRouter = typeof appRouter;