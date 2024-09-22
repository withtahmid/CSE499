import { configureStore } from "@reduxjs/toolkit";
import { useDispatch,  useSelector, TypedUseSelectorHook } from "react-redux";
import conversationReducer from "./conversatioSlice";
import chatContainerReducer from "./chatContainerSlice";
import containerReducer from "./containerSlice";
import feedbackFormReducer from "./feedbackFormSlice";
import demographicInfoReducer from "./demographicInfoSlice";

const store = configureStore({
    reducer: {
        conversation: conversationReducer,
        chatContainer: chatContainerReducer,
        container: containerReducer,
        feedbackFrom: feedbackFormReducer,
        demographicInfo: demographicInfoReducer,
    }
});
export type RootState = ReturnType< typeof store.getState >;
export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store;