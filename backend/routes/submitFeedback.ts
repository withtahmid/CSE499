import { TRPCError } from "@trpc/server";
import { protectedProcedure } from "../trpc";
import { z } from "zod"
const submitFeedbackProcedure = protectedProcedure
.input(z.array(z.number()))
.mutation(async( { input, ctx } ) => {
    
    const { conversation } = ctx;
    
    if(conversation.feedback.length !== 0){
        throw new TRPCError( { code: "UNPROCESSABLE_CONTENT", message: "Feedback array length is non zero" } );
    }
    
    const feedback = input as number[];
    
    try {
        conversation.feedback  = feedback;
        await conversation.save();
    } catch (error) {
        throw new TRPCError( { code: "INTERNAL_SERVER_ERROR", message: "Failed to write feedback into database" } );
    }    
    return { submitted: true, message: "Feedback successfully submitted" };

});
export default submitFeedbackProcedure;