import { TRPCError } from "@trpc/server";
import Conversation from "../models/Conversation";
import Message, { ConfirmationDetailsSchema, MessageSchema } from "../models/Message";
import { protectedProcedure, publicProcedure } from "../trpc";
import { z } from "zod"
import { BDI_Questions } from "../data/bdi";
import { processUserResponse } from "../utils/processUserResponse";
import { getNextQuestion } from "../utils/getNextQuestion";
import { getReport } from "../utils/getReport";
// import { handleEdgeCase } from "../utils/handleEdgeCase"
import { getPostMessage } from "../utils/postMessage";
import { newQuestionContext } from "../utils/context/startQuestionContext";
import { setScore } from "../utils/setScore";
import  ConfirmationDetails from "../models/ConfirmationDetails";
import { printAnalysis } from "../utils/printAnalysis"
import { getInitialMessage } from "../utils/getInitialMessage";
const Inputschema = z.object({
    text: z.string().min(1).max(200)
})

const sendMessageProcedure = protectedProcedure
.input(Inputschema)
.mutation(async( { input , ctx} ) => {
    const { text } = input;
    const { conversation } = ctx; 

    if(conversation.currentIndex >= BDI_Questions.length){
        // // conversation.contextForLLM.push({ sender: "Patient", text: text });
        // const botResponse = await getPostMessage(conversation);
        // const botMessage = new Message({ sender: "Assistant", text: botResponse, timestamp: Date.now() });
        // conversation.messages.push(botMessage);
        // // conversation.contextForLLM.push({ sender: "Assistant", text: botResponse });
        // botMessage.save();
        var finalReport = await getReport(conversation);
        const botMessage = new Message({ sender: "Assistant", text: finalReport, timestamp: Date.now() });
        return [ botMessage ] as MessageSchema[];
    }

    
    try {
        const userResponse = new Message({ sender: "Patient", text: text, timestamp: Date.now()});
        conversation.messages.push(userResponse);
        conversation.currentQuestionContext.push({sender: "Patient", text: text });
        userResponse.save();
    } catch (error) {
        console.log(error);
        throw new TRPCError({ message: "Failed to write Patient's mrssage into database", code: "INTERNAL_SERVER_ERROR" });   
    }
    
    if(conversation.currentIndex === -1){
        const firstMessage = await getInitialMessage(conversation);
        
        // var botResponse = await getNextQuestion(conversation);
        
        const assistantcontext = newQuestionContext(BDI_Questions[0], firstMessage);
        
        conversation.currentQuestionContext = [ assistantcontext ];
        
        var  firstQuestion = new Message({ sender: "Assistant", text: firstMessage, timestamp: Date.now(), question: BDI_Questions[0]});
        
        conversation.messages.push(firstQuestion);
        
        firstQuestion.save();

        return [ firstQuestion ] as MessageSchema[];
    }

    
    try {
        var userresponseReport  = await processUserResponse(conversation, text);
    } catch (error) {
        console.log(error);
        throw new TRPCError({ message: "Failed to generate 'userResponseReport'", code: "INTERNAL_SERVER_ERROR" });   
    }

    let response: MessageSchema[] = [];

    if(userresponseReport.followedQuestion !== undefined){
        const followedQuestion = new Message({ sender: "Assistant", text: userresponseReport.followedQuestion, timestamp: Date.now() });
        conversation.messages.push(followedQuestion);
        conversation.currentQuestionContext.push({sender: "Assistant", text: userresponseReport.followedQuestion });
        try {
            followedQuestion.save();
        } catch (error) {
            console.log(error);
        }
        response.push(followedQuestion);
    }
    else if(userresponseReport.score !== undefined){
        if(!userresponseReport.isConfident){

            const confirmationDetails: ConfirmationDetailsSchema = {
                index: conversation.currentIndex,
                question: BDI_Questions[conversation.currentIndex].question,
                answer: BDI_Questions[conversation.currentIndex].answers[userresponseReport.score],
                score: userresponseReport.score,
                confirmed: false,
            };

            const confirmationMessage = new Message({
                sender: "Assistant",
                timestamp : Date.now(),
                text: BDI_Questions[conversation.currentIndex].answers[userresponseReport.score],
                isConfirmation: true,
                confirmationDetails: confirmationDetails
            });

            response.push(confirmationMessage);
            conversation.messages.push(confirmationMessage);

            try {
                confirmationMessage.save();
            } catch (error) {
                console.log(error);
            }

        }
        try {
            setScore(conversation, conversation.currentIndex, userresponseReport.score);
        } catch (error) {
            throw new TRPCError({ message: "Failed to write score into database", code: "INTERNAL_SERVER_ERROR" });  

        }
        conversation.currentIndex = conversation.currentIndex + 1;
        


        // Final report
        if(conversation.currentIndex >= BDI_Questions.length){
            try {
                var finalReport = await getReport(conversation);
                var  assistantReport = new Message({ sender: "Assistant", text: finalReport, timestamp: Date.now()});
                conversation.messages.push(assistantReport);
                assistantReport.save();
                return [ assistantReport ];
            } catch (error) {
                throw new TRPCError({ message: "Failed to generate post analysis report", code: "INTERNAL_SERVER_ERROR" });   
            }   
        }
        
        // Ask next Question

        try {
            var botResponse = await getNextQuestion(conversation);
            const assistantcontext = newQuestionContext(BDI_Questions[conversation.currentIndex], botResponse);
            conversation.currentQuestionContext = [ assistantcontext ];
        }catch (error) {
            throw new TRPCError({ message: "Failed to generate Assistant's next question using context", code: "INTERNAL_SERVER_ERROR" });   
        } 
        try{
            var  nextQuestion = new Message({ sender: "Assistant", text: botResponse, timestamp: Date.now(), question: BDI_Questions[conversation.currentIndex] ?? undefined });
            response.push(nextQuestion);
            conversation.messages.push(nextQuestion);
            nextQuestion.save();
        } catch (error) {
            throw new TRPCError({ message: "Failed to write Assistant's reply into  database", code: "INTERNAL_SERVER_ERROR" });
        }

    }else{
        throw new TRPCError({ message: "Both Score and followed by messege is Undefined", code: "INTERNAL_SERVER_ERROR" });   
    }
    
    // printAnalysis(conversation);

    return response as MessageSchema[];

});

export default sendMessageProcedure;