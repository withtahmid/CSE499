import { publicProcedure } from "../trpc";
import { z } from "zod"
import Conversation, { ConversationSchema } from "../models/Conversation";
import Message, { MessageSchema } from "../models/Message";
import { text } from "express";
import { BDI_Questions } from "../data/bdi";

const schema = z.object({
    metadata: z.array(z.string())
})

const startProcedure = publicProcedure
.input(schema)
.mutation(async( { input, ctx } ) => {
    
    const newConversation = new Conversation({
        currentIndex: 0,
        scores: [],
        exchanges: [],
        contextForLLM: [],
        currentQuestionContext: [],
        metadata: input.metadata,
        initiateTime: Date.now()
    });


    const greetingMessage = new Message({
        sender: "Assistant",
        text: `Hi there! I'm here to help you assess your mental health using the Beck's Depression Inventory. I'll ask you a few questions to help you gain insights into your current well-being.`,
        timestamp: Date.now(),
    })

    const firstQuestion = new Message({
        sender: "Assistant",
        text: `Let's start with the first question: How sad do you feel?`,
        question: BDI_Questions[0],
        timestamp: Date.now(),
    });

    newConversation.messages.push(greetingMessage);
    newConversation.messages.push(firstQuestion);
    
    await Promise.all([ newConversation.save(), greetingMessage.save(), firstQuestion.save()] );

    return newConversation._id;

});

export default startProcedure;