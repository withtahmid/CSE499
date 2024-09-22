import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { demographicInfoList } from "../data/demographicData";

interface demographicInfoState {
    list: Array< { type: "radio" | "check", key: string, selected: string | null | string[], otherValue: string } >;
    agreed: boolean;
}
const initialState: demographicInfoState = {
    list: demographicInfoList.map( info =>  ({ type: info.type, key: info.key, selected: null, otherValue: "" })),
    agreed: false,
}
const demographicInfoSlice = createSlice({
    name: "demographicInfo",
    initialState,
    reducers: {
        setDemographicInfo: (state, action: PayloadAction <{ index: number, selected: string | null | string[], otherValue: string }> ) =>{
            const { index, selected, otherValue } = action.payload;
            if(0 <= index && index < state.list.length){
                state.list[index].selected = selected;
                state.list[index].otherValue = otherValue;
            }
        },
        toggleAgreed: (state) => {
            state.agreed = !state.agreed;
        },
        resetDemographicForm: (state) => {
            state.list = initialState.list;
            state.agreed = false;
        }
    }
});

const demographicInfoReducer = demographicInfoSlice.reducer;

export const { 
    setDemographicInfo,
    toggleAgreed,
    resetDemographicForm
} = demographicInfoSlice.actions;

export default demographicInfoReducer;

