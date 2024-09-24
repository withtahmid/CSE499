import { useEffect, useState } from "react";
import { RiSendPlane2Fill } from "react-icons/ri";
import { useAppDispatch, useAppSelector } from "../store";
import { sendMessage } from "../store/conversatioSlice";
import { setSuggessionText } from "../store/chatContainerSlice";
import RadialProgress from "./small-components/RadialProgress";

const answerOptions = ["A", "B", "C", "D"];

const ChatContainerBottom = () => {
    const dispatch = useAppDispatch();
    
    const [ text, setText ] = useState("");

    const conversation = useAppSelector(state => state.conversation);
    const { currentQuestion, status, messages, isFinished} = conversation;
    const [ showOptions, setShowOptions ] = useState(false);

    const suggessionText = useAppSelector(state => state.chatContainer.suggessionText);

    useEffect(() => {
        let lastMessage = null
        if(messages.length > 0 ){
            lastMessage = messages[messages.length - 1];
        }
        if(lastMessage && lastMessage.question && lastMessage.question.answers.length > 0){
            setShowOptions(true);
        }else{
            setShowOptions(false);
        }
    }, [messages]);

    const onTextChange = (event: { target : { value : string} }) => {
        setText(event.target.value);
    }

    const handleEnterPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
          event.preventDefault();
          HandleSendMessage();
        }
    };

    const getResponse = (text: string) => {
        if(text.length > 0 && status !== "waiting"){
            dispatch(sendMessage({ text }));
            setText("")
        }
    }

    const submicAnswerByOption = (index: number) => {
        if(currentQuestion && currentQuestion.answers.length >= index && index >= 0){
            getResponse(currentQuestion.answers[index]);
        }else{
            console.log(currentQuestion);
        }
    }

    const HandleSendMessage = () => {
        if(text.length > 0 && status !== "waiting"){
            getResponse(suggessionText.length > 0 ? suggessionText :  text);
        }
    }

    const setSuggession = (suggession: string) => {
        dispatch(setSuggessionText(suggession));
    }

    useEffect(() => {
        const trimmedText = text.trim().toUpperCase();
        if(answerOptions.includes(trimmedText) && currentQuestion){
            setSuggession(currentQuestion.answers[answerOptions.findIndex(c => c == trimmedText)] ?? "")
        }else{
            setSuggession("");
        }
    }, [text, currentQuestion, status]);

    return (
    <div className="h-auto items-center absolute bottom-5 left-0 right-0">
        <div className="px-5 py-2 flex gap-3 bg-inherit/[0.4] backdrop-blur-sm">
            <RadialProgress />
            <label className="bg-base-100 input input-bordered flex items-center gap-5 grow bg-base" >
                <input disabled={isFinished} type="text" className="grow flex-1" value={text} onChange={onTextChange} onKeyDown={handleEnterPress} placeholder="Send text message"/>
                {/* options */}
                {/* {(showOptions)&&(answerOptions.map((c, i) => (<kbd key={i} onClick={() => submicAnswerByOption(i)}  className="kbd kbd-md cursor-pointer hover:font-bold hover:border-2">{c}</kbd>)))} */}
                {text.length > 0 &&(
                    <button className="text-2xl" onClick={HandleSendMessage}>
                    <RiSendPlane2Fill />
                </button>)}
            </label>
        </div>
    </div>
    )
}

export default ChatContainerBottom;