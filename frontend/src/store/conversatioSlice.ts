import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import MessageSchema from "../types/Message";
import { trpc } from "../trpc";
import QuestionSchema from "../types/Question";

import { v4 as uuidV4 } from "uuid"
import { TRPCClientError } from "@trpc/client";

export interface ConversationState{
    _id: string | undefined;
    messages: MessageSchema[];
    isFinished: boolean;
    status: "idle" | "loading" | "waiting" | "creating" |  "succeeded" | "failed" | "adjusting";
    error: { id: string; message: string; } | undefined;
    currentQuestion: QuestionSchema | null;
}

const createError = (message: string) => {
    return { id: uuidV4(), message: message };
}

const initialState: ConversationState = {
    _id: localStorage.getItem("conversationId") ?? undefined,
    messages: [],
    isFinished: false,
    status:"idle",
    error: undefined,
    currentQuestion: null,
}

interface Previous{
    messages: MessageSchema[],
    isFinished: boolean
}

export const fetchPreviousConversation = createAsyncThunk <Previous, undefined, { rejectValue: string }>(
    "conversation/fetchPrevious",
    async(_, { rejectWithValue } ) =>{
        try {
            const response = await trpc.fetchPrevious.query();
            return response as any;
        } catch (error) {
            if(error instanceof TRPCClientError){
                return rejectWithValue (error.message);
            }
        }
        return rejectWithValue ("Failed to fetch previous messagess");
    }
)

export const startNewConversation = createAsyncThunk <any, { demographicInfos: ({ key: string, selected: string | string[], otherValue: string })[] }, { rejectValue: string}>(
    "conversation/start",
    async({ demographicInfos }, { rejectWithValue } ) =>{
        try {
            const conversationId = await trpc.start.mutate(demographicInfos);
            return conversationId;
        } catch (error) {
            if(error instanceof TRPCClientError){
                return rejectWithValue (error.message);
            }
        }
        return rejectWithValue ("Failed to start new conversation");
    }
)

export const sendMessage =  createAsyncThunk <MessageSchema[], { text: string }, { rejectValue: string}>(
    "conversation/sendMessage",
    async( {  text }, { rejectWithValue } ) =>{
        try {
            const response = await trpc.sendMessage.mutate(( { text } ))
            return response as any;
        } catch (error) {
            if(error instanceof TRPCClientError){
                return rejectWithValue (error.message);
            }
        }
        return rejectWithValue ("Failed to send message");
    }
)

export const adjustScore = createAsyncThunk<MessageSchema, {_id:string, score: number}, { rejectValue: string} >(
    "conversation/adjustScore",
    async( {  _id, score }, { rejectWithValue } ) =>{
        try {
            const response = await trpc.adjustScore.mutate({_id, score});
            return response as any;
        } catch (error) {
            if(error instanceof TRPCClientError){
                return rejectWithValue (error.message);
            }
        }
        return rejectWithValue ("Failed to adjust score");
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
            // state.error = createError(action.payload as string);

            state.error = createError("Faild to load previous conversation");
        })
        .addCase(fetchPreviousConversation.fulfilled, (state, action) => {
            const messages = action.payload.messages;
            state.messages = [];
            messages.forEach((message) => {
                state.messages.push(message);
                if(message.question && message.question.answers && message.question.answers.length){
                    state.currentQuestion = message.question;
                }else{
                    // state.currentQuestion = null;
                }
                if(message.isReport){
                    state.isFinished = true;
                }
            });
            state.isFinished = action.payload.isFinished;
            state.status = "succeeded";
        });


        builder
        .addCase(sendMessage.pending, (state, action) => {
            // state.currentQuestion = null;
            const userText = action.meta.arg.text;
            state.status = "waiting";
            const message: MessageSchema = { _id: uuidV4(), sender: "Patient", text: userText, timestamp: Date.now()};
            state.messages.push(message);
        })
        .addCase(sendMessage.rejected, (state, action) => {
            state.status = "failed";
            // state.error = createError(action.payload as string);
            state.error = createError("Faild to send message");
        })
        .addCase(sendMessage.fulfilled, (state, action) => {
            const messages = action.payload;
            messages.forEach((message) => {
                state.messages.push(message);
                if(message.question && message.question.answers && message.question.answers.length){
                    state.currentQuestion = message.question;
                }else{
                    // state.currentQuestion = null;
                }
                if(message.isReport){
                    state.isFinished = true;
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
            // state.error = createError(action.payload as string);
            state.error = createError("Faild to start the conversation");
        })
        .addCase(startNewConversation.fulfilled, (state, action) => {
            localStorage.setItem("conversationId", action.payload);
            state._id = action.payload;
            state.status = "succeeded";
            state.error = undefined;
            state.messages = []
        });

        builder
        .addCase(adjustScore.pending, (state, action) => {
            state.status = "adjusting";
        })
        .addCase(adjustScore.rejected, (state, action) => {
            state.status = "failed";
            // state.error = createError(action.payload as string);
            state.error = createError("Faild to adjust option manually");
        })
        .addCase(adjustScore.fulfilled, (state, action) => {
            const message = action.payload;
            const index = state.messages.findIndex(m => m._id === message._id);
            if(index != -1){
                state.messages[index] = message;
            }
        })
    }
});

const conversationReducer = conversationSlice.reducer;
export const { clearConversation } = conversationSlice.actions;
export default conversationReducer;