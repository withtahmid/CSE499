import { publicProcedure } from "../trpc";
import { z } from "zod"
import Conversation, { ConversationSchema } from "../models/Conversation";
import Message, { MessageSchema } from "../models/Message";
import { text } from "express";
import { BDI_Questions } from "../data/bdi";
import { newQuestionContext } from "../utils/context/startQuestionContext";
import { initialGreeting } from "../data/config"
const schema = z.object({
    metadata: z.array(z.string())
})



const startProcedure = publicProcedure
.input(schema)
.mutation(async( { input } ) => {
    
    const conversation = new Conversation({
        currentIndex: -1,
        scores: [],
        exchanges: [],
        contextForLLM: [],
        currentQuestionContext: [],
        metadata: input.metadata,
        initiateTime: Date.now()
    });

    const greetingMessage = new Message({
        sender: "Assistant",
        text: initialGreeting,
        timestamp: Date.now(),
    })

    // const firstQuestion = new Message({
    //     sender: "Assistant",
    //     text: `Let's start with the first question: How sad do you feel?`,
    //     question: BDI_Questions[0],
    //     timestamp: Date.now(),
    // });

    conversation.messages.push(greetingMessage);
    // conversation.messages.push(firstQuestion);

    conversation.currentQuestionContext.push({sender: "Patient", text: initialGreeting });
    
    // const assistantcontext = newQuestionContext(BDI_Questions[0], `Let's start with the first question: How sad do you feel?`);
    
    // conversation.currentQuestionContext.push(assistantcontext);
    
    // conversation.scores.push({ questionIndex: conversation.currentIndex, score: 0, startTime: Date.now(), endTime: 0 });
    
    await Promise.all([ conversation.save(), greetingMessage.save(), /*firstQuestion.save()*/] );

    return conversation._id;

});

export default startProcedure;