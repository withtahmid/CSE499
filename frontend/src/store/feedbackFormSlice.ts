import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { feedbacksPoints } from "../components/feedback/data";
import { trpc } from "../trpc";
import { TRPCClientError } from "@trpc/client";

interface feedbackFormState{
    feedback: (number | null)[];
    status: "idle" | "loading" | "failed" | "submitted";  
}

const initialState:feedbackFormState = {
    feedback: feedbacksPoints.map(() => null),
    status: "idle",
}

export const submitFeedback = createAsyncThunk<boolean, number[] , { rejectValue: string }>(
    "feedbackForm/submit",
    async (feedback: number[], { rejectWithValue }) => {
        try {
            const response = await trpc.submitFeedback.mutate(feedback);
            return response.submitted;
        } catch (error) {
            if(error instanceof TRPCClientError){
                return rejectWithValue (error.message);
            }
        }
        return rejectWithValue ("Failed to submit feedback");
    }
)

const feedbackFormSlice = createSlice({
    name: "feedbackForm",
    initialState,
    reducers: {
        resetFeedbackForm: (state, action: PayloadAction<undefined>) => {
            state.feedback = feedbacksPoints.map(() => null);
            state.status = "idle";
        },
        setFeedbackRadioValue: (state, action: PayloadAction < { index: number, value: number } >) => {
            const { index, value } = action.payload;
            if(index < state.feedback.length){
                state.feedback[index] = value;
            }
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(submitFeedback.pending, (state) => {
            state.status = "loading";
        })
        .addCase(submitFeedback.rejected, (state) => {
            state.status = "failed";
        })
        .addCase(submitFeedback.fulfilled, (state, action) => {
            state.status = ( action.payload === true ) ? "submitted" : "failed";
        })

    }
});

const feedbackFormReducer = feedbackFormSlice.reducer;
export default feedbackFormReducer;
export const  { setFeedbackRadioValue, resetFeedbackForm  } = feedbackFormSlice.actions;
