import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface chatContainerState{
    suggessionText: string;
}

const initialState: chatContainerState = {
    suggessionText: "",
}

const chatContainerSlice = createSlice({
    name: "chatContainer",
    initialState,
    reducers: {
        setSuggessionText: (state, action: PayloadAction<string>) =>{
            state.suggessionText = action.payload;
        }
    }
});

const chatContainerReducer = chatContainerSlice.reducer;
export  default chatContainerReducer;
export const { setSuggessionText } = chatContainerSlice.actions;