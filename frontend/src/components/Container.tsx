import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import ChatContainer from "./ChatContainer";
import MetadataForm from "./metadata/MetadataForm";
import { useToast } from "./toast/ToastProvider";
import NewConversationModal from "./modals/NewConversationModal";
import { setCurrentpage } from "../store/containerSlice";
import FeedBackForm from "./feedback/FeedbackForm";
import FeebackSuccessModal from "./modals/FeedbackSuccessModal";
import SkipFeedbackModal from "./modals/SkipFeedbackModal";
const Container = () => {
    const dispatch = useAppDispatch();

    const { addToast } = useToast();
    const error = useAppSelector(state => state.conversation.error);
    const currecntPage = useAppSelector(state => state.container.currentPage);
    const conversationId = useAppSelector(state => state.conversation._id);

    useEffect(() => {
        
        if(conversationId && currecntPage !== "feedback"){
            dispatch(setCurrentpage("chat"));
        }else if(currecntPage !== "feedback"){
            dispatch(setCurrentpage("form"));
        }

    }, [conversationId])

    useEffect(() => {
        
        if(error){
            addToast(error.message, "error");
        }

    }, [error])

    
    return (
        <div className="h-full w-full overflow-y-auto overflow-x-hidden  bg-base-200">
            {currecntPage==="form" ? (<MetadataForm /> ) : currecntPage ==="chat" ? <ChatContainer /> : currecntPage === "feedback" ? <FeedBackForm /> : <></>}
            <NewConversationModal />
        </div>
    )
}

export default Container;