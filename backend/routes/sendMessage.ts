import { TRPCError } from "@trpc/server";
import Conversation from "../models/Conversation";
import Message, { MessageSchema } from "../models/Message";
import { publicProcedure } from "../trpc";
import { z } from "zod"
import { BDI_Questions } from "../data/bdi";
import { processUserResponse } from "../utils/processUserResponse";
import { getNextQuestion } from "../utils/getNextQuestion";
import { getReport } from "../utils/getReport";
import { handleEdgeCase } from "../utils/handleEdgeCase"

const Inputschema = z.object({
    text: z.string().min(1).max(200),
    conversationId: z.string().length(24),
    index: z.number().or(z.undefined()),

})

const sendMessageProcedure = publicProcedure
.input(Inputschema)
.mutation(async( { input } ) => {
    
    const { conversationId, text , index} = input;
    const conversation = await Conversation.findById(conversationId).populate("messages").exec();
    
    if(!conversation){
        throw new TRPCError({ message: "Incorrect Conversation Id", code:"NOT_FOUND" });
    }

    try {
        const userResponse = new Message({ sender: "Patient", text: text, timestamp: Date.now()});
        conversation.messages.push(userResponse);
        await Promise.all([  userResponse.save(), conversation.save() ]);
    } catch (error) {
        console.log(error);
        throw new TRPCError({ message: "Failed to write Patient's mrssage into database", code: "INTERNAL_SERVER_ERROR" });   
    }
    

    if(conversation.currentIndex == -1 || conversation.currentIndex >= BDI_Questions.length){
        const initial = conversation.currentIndex == -1;
        conversation.contextForLLM.push({ sender: "Patient", text: text });
        const botResponse = await handleEdgeCase(conversation, text);
        conversation.currentIndex = initial ? 0 : conversation.currentIndex;
        const botMessage = new Message({ sender: "Assistant", text: botResponse, timestamp: Date.now(), question: initial? BDI_Questions[0] : undefined });
        conversation.messages.push(botMessage);
        conversation.contextForLLM.push({ sender: "Assistant", text: botResponse });
        await Promise.all([  botMessage.save(), conversation.save() ]);
        return [ botMessage ] as MessageSchema[];
    }

    try {
        var userresponseReport  = await processUserResponse(conversation, text, index);
    } catch (error) {
        console.log(error);
        throw new TRPCError({ message: "Failed to generate 'userResponseReport'", code: "INTERNAL_SERVER_ERROR" });   
    }
    
    let response: MessageSchema[] = [];

    if(userresponseReport.followedQuestion !== undefined){
        console.log("\n\nAsking again");
        const followedQuestion = new Message({ sender: "Assistant", text: userresponseReport.followedQuestion, timestamp: Date.now() });
        conversation.messages.push(followedQuestion);
        try {
            await Promise.all([ followedQuestion.save(), conversation.save() ]);
        } catch (error) {
            console.log(error);
            throw new TRPCError({ message: "Failed to write Assistant's reply into  database", code: "INTERNAL_SERVER_ERROR" });   
        }
        response = [ followedQuestion ];
    }
    else if(userresponseReport.score !== undefined){
        console.log(`\n\nObtained Score: ${userresponseReport.score}`);
        conversation.contextForLLM.push({ sender: "Patient", text: BDI_Questions[conversation.currentIndex].answers[userresponseReport.score]});
        conversation.scores.push({
            questionIndex: conversation.currentIndex,
            score: userresponseReport.score,
            isConfident: userresponseReport.isConfident ?? false,
        });
        conversation.currentIndex = conversation.currentIndex + 1;
        
        if(conversation.currentIndex < BDI_Questions.length){
            try {
                var botResponse = await getNextQuestion(conversation);
                conversation.contextForLLM.push({ sender: "Assistant", text: botResponse });
            } catch (error) {
                throw new TRPCError({ message: "Failed to generate Assistant's next question using context", code: "INTERNAL_SERVER_ERROR" });   
            }   
        }else if(conversation.currentIndex === BDI_Questions.length){
            try {
                var botResponse = await getReport(conversation);
                conversation.contextForLLM.push({ sender: "Assistant", text: botResponse });
            } catch (error) {
                throw new TRPCError({ message: "Failed to generate post analysis report", code: "INTERNAL_SERVER_ERROR" });   
            }   
        }else{
            throw new TRPCError({ message: `Reached unreachable part. "conversation.currentIndex" is greater than questions`, code: "INTERNAL_SERVER_ERROR" }); 
        }
        
        try{
            var  nextQuestion = new Message({ sender: "Assistant", text: botResponse, timestamp: Date.now(), question: BDI_Questions[conversation.currentIndex] });
            response = [ nextQuestion ];
            conversation.messages.push(nextQuestion);
            await Promise.all([ nextQuestion.save(), conversation.save() ]);
        } catch (error) {
            throw new TRPCError({ message: "Failed to write Assistant's reply into  database", code: "INTERNAL_SERVER_ERROR" });
        }

    }else{
        throw new TRPCError({ message: "Both Score and followed by messege is Undefined", code: "INTERNAL_SERVER_ERROR" });   
    }

    // console.log("\n-------------");
    // console.log(`Index: ${conversation.currentIndex}, Score: ${conversation.scores.reduce((acc, current) => acc + current.score, 0)}`)
    // console.log("-------------\n");

    return response as MessageSchema[];

});

export default sendMessageProcedure;