import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export interface Radio{
    selected: string | null;
    otherValue: string;
}

const defaultRadio: Radio = { selected: null, otherValue: "" }

interface Checkbox{

    selected: string[];
    otherValue: string;
}

interface metadataState{
    education: Radio;
    gender: Radio;
    // 
    agreed: boolean;
    [key: string]: boolean | Radio;
}

const initialState: metadataState = {
    education: defaultRadio,
    gender: defaultRadio,
    agreed: false,
}


const metadataSlice = createSlice({
    name: "metadata",
    initialState,
    reducers: {
        toggleAgreed: (state) =>{
            state.agreed = !state.agreed;
        },
        reset: (state) => {
            state.agreed = false,
            state.education = state.gender = defaultRadio;
        },
        setEducation: (state, action: PayloadAction<Radio>) =>{
            state.education = action.payload;
        },
        setGender: (state, action: PayloadAction<Radio> ) =>{
            state.gender = action.payload;
        }
    }
});

const metadataReducer = metadataSlice.reducer;
export const { 
    toggleAgreed,
    reset, 
    setEducation, 
    setGender, 
} = metadataSlice.actions;
export default metadataReducer;

