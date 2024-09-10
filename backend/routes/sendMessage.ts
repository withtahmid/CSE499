
import { TRPCError } from "@trpc/server";
import Conversation from "../models/Conversation";
import Message, { MessageSchema } from "../models/Message";
import { publicProcedure } from "../trpc";
import { z } from "zod"
import { BDI_Questions } from "../data/bdi";
import { executePrompt } from "../llm/gemini";
import { Types } from "mongoose";
const Inputschema = z.object({
    text: z.string().min(1).max(200),
    conversationId: z.string().length(24),
    index: z.number().or(z.undefined())
})

const sendMessageProcedure = publicProcedure
.input(Inputschema)
.mutation(async( { input } ) => {
    
    const { conversationId, text } = input;
    const conversation = await Conversation.findById(conversationId);
    
    if(!conversation){
        throw new TRPCError({ message: "Incorrect Conversation Id", code:"NOT_FOUND" });
    }

    const userResponse = new Message({
        sender: "Patient",
        text: text,
        timestamp: Date.now(),
    });

    
    conversation.currentIndex = Math.min(BDI_Questions.length - 1, conversation.currentIndex + 1);
    
    const question = BDI_Questions[conversation.currentIndex];


    const botresponse1 = new Message({
        sender: "Assistant",
        text: question.question,
        timestamp: Date.now(),
        question: question
    })

    try {
        var res = await executePrompt(text)
    } catch (error) {
        console.log(error)
        throw new TRPCError({ message: "Failed to connect to llm", code:"INTERNAL_SERVER_ERROR" });
    }

    const botresponse2 = new Message({
        sender: "Assistant",
        text: res,
        timestamp: Date.now(),
    })

    const response:MessageSchema[] = [ 
        botresponse2,
        botresponse1,
    ]

    conversation.messages.push(userResponse);
    conversation.messages.push(botresponse2);
    conversation.messages.push(botresponse1);

    try {
        await Promise.all([ userResponse.save(), botresponse2.save(),  botresponse1.save(), conversation.save() ]);
    } catch (error) {
        throw new TRPCError({ message: "Failed to save data into database", code: "INTERNAL_SERVER_ERROR" });
    }

    return response as MessageSchema[]

});

export default sendMessageProcedure;