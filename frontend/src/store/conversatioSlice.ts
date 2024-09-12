import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import MessageSchema from "../types/Message";
import { trpc } from "../trpc";
import QuestionSchema from "../types/Question";

import { v4 as uuidV4} from "uuid"

export interface ConversationState{
    _id: string | undefined;
    messages: MessageSchema[];
    status: "idle" | "loading" | "waiting" | "creating" |  "succeeded" | "failed";
    error: string | undefined;
    currentQuestion: QuestionSchema | null;
}

const initialState: ConversationState = {
    _id: localStorage.getItem("conversationId") ?? undefined,
    messages: [], 
    status:"idle",
    error: undefined,
    currentQuestion: null,
}

export const fetchPreviousConversation = createAsyncThunk <MessageSchema[], { conversationId: string }, { rejectValue: string}>(
    "conversation/fetchPrevious",
    async({ conversationId }, { rejectWithValue } ) =>{
        try {
            const response = await trpc.fetchPrevious.query({ conversationId });
            return response as MessageSchema[];
        } catch (error) {
            return rejectWithValue ("Something went wrong");
        }
    }
)

export const startNewConversation = createAsyncThunk <string, { metadata: string[] }, { rejectValue: string}>(
    "conversation/start",
    async({ metadata }, { rejectWithValue } ) =>{
        try {
            const conversationId = await trpc.start.mutate({ metadata });
            return conversationId;
        } catch (error) {
            return rejectWithValue ("Something went wrong");
        }
    }
)

export const sendMessage =  createAsyncThunk <MessageSchema[], { conversationId:string, text: string, index?:number }, { rejectValue: string}>(
    "conversation/sendMessage",
    async( { conversationId, text, index }, { rejectWithValue } ) =>{
        try {
            const response = await trpc.sendMessage.mutate(( { conversationId, text, index } ))
            return response as MessageSchema[];
        } catch (error) {
            console.error(error);
            return rejectWithValue ("Something went wrong");
        }
    }
)

const conversationSlice = createSlice({
    name: "conversation",
    initialState,
    reducers:{
        clearConversation: (state) => {
            localStorage.removeItem("conversationId");
            state._id = undefined;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchPreviousConversation.pending, (state) => {
            state.status = "loading";
        })
        .addCase(fetchPreviousConversation.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message ?? "Something went wrong";
        })
        .addCase(fetchPreviousConversation.fulfilled, (state, action) => {
            const messages = action.payload;
            state.messages = [];
            messages.forEach((message) => {
                state.messages.push(message);
                if(message.question && message.question.answers && message.question.answers.length){
                    state.currentQuestion = message.question;
                }else{
                    state.currentQuestion = null;
                }
            });
            state.status = "succeeded";
        });


        builder
        .addCase(sendMessage.pending, (state, action) => {
            state.currentQuestion = null;
            const userText = action.meta.arg.text;
            state.status = "waiting";
            const message: MessageSchema = { _id: uuidV4(), sender: "Patient", text: userText, timestamp: Date.now()};
            state.messages.push(message);
        })
        .addCase(sendMessage.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message ?? "Something went wrong";
        })
        .addCase(sendMessage.fulfilled, (state, action) => {
            const messages = action.payload;
            messages.forEach((message) => {
                state.messages.push(message);
                if(message.question && message.question.answers && message.question.answers.length){
                    state.currentQuestion = message.question;
                }else{
                    state.currentQuestion = null;
                }
            });
            state.status = "succeeded";
        });

        builder
        .addCase(startNewConversation.pending, (state, _) => {
            state.status = "creating";
        })
        .addCase(startNewConversation.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        })
        .addCase(startNewConversation.fulfilled, (state, action) => {
            localStorage.setItem("conversationId", action.payload);
            state._id = action.payload;
            state.status = "succeeded";
            state.error = undefined;
            state.messages = []
        });
    }
});

const conversationReducer = conversationSlice.reducer;
export const { clearConversation } = conversationSlice.actions;
export default conversationReducer;