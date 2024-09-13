import { publicProcedure } from "../trpc";
import { z } from "zod"
import Conversation, { ConversationSchema } from "../models/Conversation";
import Message, { MessageSchema } from "../models/Message";
import { text } from "express";
import { BDI_Questions } from "../data/bdi";
import { newQuestionContext } from "../utils/context/startQuestionContext";

const schema = z.object({
    metadata: z.array(z.string())
})

const firstMessage = `Hi there! I'm here to help you assess your mental health using the Beck's Depression Inventory. I'll ask you a few questions to help you gain insights into your current well-being.`;

const startProcedure = publicProcedure
.input(schema)
.mutation(async( { input } ) => {
    
    const conversation = new Conversation({
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
        text: firstMessage,
        timestamp: Date.now(),
    })

    const firstQuestion = new Message({
        sender: "Assistant",
        text: `Let's start with the first question: How sad do you feel?`,
        question: BDI_Questions[0],
        timestamp: Date.now(),
    });
    conversation.messages.push(greetingMessage);
    conversation.messages.push(firstQuestion);

    conversation.currentQuestionContext.push({sender: "Patient", text: firstMessage });
    const assistantcontext = newQuestionContext(BDI_Questions[0], `Let's start with the first question: How sad do you feel?`);
    conversation.currentQuestionContext.push(assistantcontext);
    
    await Promise.all([ conversation.save(), greetingMessage.save(), firstQuestion.save()] );

    return conversation._id;

});

export default startProcedure;