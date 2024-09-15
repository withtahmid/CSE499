import { useEffect } from "react";
import { useAppSelector } from "../store";
import ChatContainer from "./ChatContainer";
import MetadataForm from "./metadata/MetadataForm";
import { useToast } from "./toast/ToastProvider";
import NewConversationModal from "./modals/NewConversationModal";

const Container = () => {

    const { addToast } = useToast();
    const error = useAppSelector(state => state.conversation.error);
    
    useEffect(() => {
        if(error){
            addToast(error.message, "error");
        }
    }, [error])

    const conversationId = useAppSelector(state => state.conversation._id);
    
    return (
        <div className="h-full w-full overflow-y-auto overflow-x-hidden  bg-base-200">
            { conversationId ? <ChatContainer /> : <MetadataForm /> }
            <NewConversationModal />
        </div>
    )
}

export default Container;