
import { TRPCError } from "@trpc/server";
import Conversation from "../models/Conversation";
import {  protectedProcedure, publicProcedure } from "../trpc";
import { z } from "zod"

const Inputschema = z.object({
    text: z.string().min(1).max(200),
    conversationId: z.string().length(24),
})



const getScoreDistribution = protectedProcedure
.query(async( { ctx } ) => {
    const conversation = ctx.conversation;
    if(!conversation.isFinished){
        throw new TRPCError({message: "Distribution cannot be shown before final score", code: "FORBIDDEN"});
    }
    try {
        var mongooseDocs = await Conversation.find();
    } catch (error) {
        throw new TRPCError( { message: "Failed to retrive conversations", code: "INTERNAL_SERVER_ERROR" });
    }
    // const distribution = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,];
    const allConversations = mongooseDocs.map(doc => doc.toObject());
    const scores = allConversations.filter(con => con.isFinished === true).map(con => con.obtainedScore);
    // for(let i in scores){
    //     distribution[i] += 1;
    // }
    // return distribution;
    const dist = [ 0, 0, 0, 0, 0, 0, 0, 0];
    const d = {
        normal: 0,
        mild: 0,
        borderline: 0,
        moderate: 0,
        severe: 0,
        extreme: 0
    }
    for(let i = 0; i < scores.length; ++i){
        const s = scores[i];
        if(s > 40) d.extreme ++;
        else if(s >= 31) d.severe ++;
        else if(s >= 21) d.moderate ++;
        else if(s >= 17) d.borderline ++;
        else if(s >= 11) d.mild ++;
        else d.normal++;
    }

    let score = -1;

    for(let i = 0; i < scores.length; ++i){
        const s = scores[i];
        if(conversation.obtainedScore > 40) score = 6;
        else if(conversation.obtainedScore >= 31)  score = 5;
        else if(conversation.obtainedScore >= 21)  score = 4;
        else if(conversation.obtainedScore >= 17)  score = 3;
        else if(conversation.obtainedScore >= 11)  score = 2;
        else  score = 1;
    }

    const distribution = Object.entries(d).map(([k, v]) => v)
    distribution.unshift(0);
    distribution.push(0);
    
    return { distribution, score };
});

export default getScoreDistribution;