import { configureStore } from "@reduxjs/toolkit";
import { useDispatch,  useSelector, TypedUseSelectorHook } from "react-redux";
import conversationReducer from "./conversatioSlice";
import metadataReducer from "./metadataSlice";
import chatContainerReducer from "./chatContainerSlice";
const store = configureStore({
    reducer: {
        conversation: conversationReducer,
        metadata: metadataReducer,
        chatContainer: chatContainerReducer,
    }
});
export type RootState = ReturnType< typeof store.getState >;
export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store;