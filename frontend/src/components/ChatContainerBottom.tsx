import { useEffect, useState } from "react";
import { RiSendPlane2Fill } from "react-icons/ri";
import { useAppDispatch, useAppSelector } from "../store";
import { sendMessage } from "../store/conversatioSlice";

const answerOptions = ["A", "B", "C", "D"];

const ChatContainerBottom = () => {
    const dispatch = useAppDispatch();
    
    const [ text, setText ] = useState("");
    
    const conversation = useAppSelector(state => state.conversation);

    const { currentQuestion, status, messages} = conversation;
    
    const [ showOptions, setShowOptions ] = useState(false);

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

    const getResponse = (text: string, index: number | undefined) => {
        if(text.length > 0 && status !== "waiting"){
            dispatch(sendMessage({ text, index }));
            setText("")
        }
    }

    const submicAnswerByOption = (index: number) => {
        if(currentQuestion && currentQuestion.answers.length >= index){
            getResponse(currentQuestion.answers[index], index);
        }
    }

    const HandleSendMessage = () => {
        if(text.length > 0 && status !== "waiting"){
            getResponse(text, undefined);
            setText("");
        }
    }

    return (
        <div className="h-auto items-center absolute bottom-0 left-0 right-0">
        <div className="px-5 py-2 flex gap-3 bg-inherit/[0.4] backdrop-blur-sm">
            <label className="bg-base-100 input input-bordered flex items-center gap-5 grow bg-base" >
                <input disabled={false} type="text" className="grow flex-1" value={text} onChange={onTextChange} onKeyDown={handleEnterPress} placeholder="Send text message"/>
                {(showOptions)&&(answerOptions.map((c, i) => (<kbd key={i} onClick={() => submicAnswerByOption(i)}  className="kbd kbd-md cursor-pointer hover:font-bold hover:border-2">{c}</kbd>)))}
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