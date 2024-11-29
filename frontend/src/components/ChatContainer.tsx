import { useAppDispatch, useAppSelector } from "../store";
import ChatBubble from "./ChatBubble";
import { useEffect, useRef, useState } from "react";
import { fetchPreviousConversation, } from "../store/conversatioSlice";
import TypingBubble from "./TypingBubble";
import ChatContainerBottom from "./ChatContainerBottom";
import ChatLoadingSkeleton from "./ChatLoadingSkeleton";
import SuggessionBubble from "./SuggessionBubble";
import ErrorBubble from "./ErrorBubble";
import { useSelector } from "react-redux";
import FeedbackBtn from "./small-components/FeedbackBtn";
import ChatTop from "./ChatTop";
import ChartDriver from "./ChartDriver";
const ChatContainer = () => {
    
    const messages = useAppSelector(state  => state.conversation.messages);
    const conversationId = useAppSelector(state  => state.conversation._id);
    const status = useAppSelector(state  => state.conversation.status);
    const conversationDivRef = useRef<HTMLDivElement>(null);
    const suggessionText = useAppSelector(state => state.chatContainer.suggessionText);
    const isFinished = useAppSelector(state => state.conversation.isFinished);

    const [ firstLand,  setFirstLand]  = useState(true);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if(conversationId){
            dispatch(fetchPreviousConversation());
        }
    }, [conversationId]);

    useEffect(() => {
        if(conversationDivRef.current && !firstLand){
            conversationDivRef.current.scrollTo({ top: conversationDivRef.current.scrollHeight, behavior: "smooth" });
        }else if(conversationDivRef.current && firstLand){
            conversationDivRef.current.scrollTo({ top: conversationDivRef.current.scrollHeight, behavior: "instant" });
        }
        if(messages.length > 0){
            setFirstLand(false);
        }
    },[messages])

    useEffect(() => {
        if(conversationDivRef.current && suggessionText.length > 0 && !firstLand){
            conversationDivRef.current.scrollTo({ top: conversationDivRef.current.scrollHeight, behavior: "smooth" });
        }
    }, [suggessionText]);

    
    return (
        <div className="w-full h-full flex justify-center">
            <div className="flex flex-col h-full w-full  w-full md:w-8/12 lg:w-4/12 bg-base-300 relative">
                <ChatTop />
                <div className="relative h-full ">
                    <div className="absolute bottom-0 pl-2 right-0 left-0 max-h-full overflow-x-hidden overflow-y-auto pb-24 scrollbar-hide"  ref={conversationDivRef}>
                        {messages.map(message => (
                            <ChatBubble message={message} key={message._id}/>
                        ))}
                        {(!isFinished && status==="loading") &&  (<ChatLoadingSkeleton />)}
                        {!isFinished && status==="waiting" && ( <TypingBubble />)}
                        {suggessionText.length > 0 && status !=="waiting" && ( <SuggessionBubble />)}
                        {(isFinished === true)&&(<FeedbackBtn />)}
                        {status === "failed" && (<ErrorBubble error={"Something went wrong."}/>)}
                    </div>
                </div>
                <ChatContainerBottom />
            </div>
        </div>
    )
};

export default ChatContainer;