import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CurrentPageType = "form" | "chat" | "feedback";

interface ContainerState{
    currentPage: CurrentPageType;
}

const initialState:ContainerState = {
    currentPage: (():CurrentPageType =>{
        const page = localStorage.getItem("currentPage");
        if(page === "form" || page === "chat" || page === "feedback"){
            return page as CurrentPageType;
        }
        return "form" as CurrentPageType;
    })(),
}

const containerSlice = createSlice({
    name: "container",
    initialState,
    reducers: {
        setCurrentpage: (state, action: PayloadAction< CurrentPageType >) => {
            state.currentPage = action.payload;
            localStorage.setItem("currentPage", action.payload);
        }
    }
});

const containerReducer = containerSlice.reducer;
export default containerReducer;
export const  { setCurrentpage  } = containerSlice.actions;
