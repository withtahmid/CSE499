import { inferAsyncReturnType, initTRPC, TRPCError } from "@trpc/server";
import { CreateExpressContextOptions } from "@trpc/server/adapters/express";
export const createContext = async (opts: CreateExpressContextOptions) => {
    const { req, res } = opts;
    return { req, res, user: { id : "1234" } };
  }

type Context = inferAsyncReturnType<typeof createContext>;

const t = initTRPC.context<Context>().create();

export const router = t.router;
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use( ( { ctx, next }) => {
    if(!ctx.user){
        throw new TRPCError({code: "UNAUTHORIZED"});
    }
    return next();
});