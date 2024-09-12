import { useEffect, useState } from "react";
import { RiSendPlane2Fill } from "react-icons/ri";
import { useAppDispatch, useAppSelector } from "../store";
import { sendMessage } from "../store/conversatioSlice";

const answerOptions = ["A", "B", "C", "D"];

const ChatContainerBottom = () => {
    const [ text, setText ] = useState("");
    const curreentQuestion = useAppSelector(state => state.conversation.currentQuestion)
    const conversationId = useAppSelector(state  => state.conversation._id);
    const isConfirmation = useAppSelector(state => state.conversation.isConfirmation)
    const dispatch = useAppDispatch();

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
        if(conversationId && text.length > 0){
            dispatch(sendMessage({ conversationId, text, index }));
        }
    }

    const submicAnswerByOption = (index: number) => {
        if(curreentQuestion && curreentQuestion.answers.length >= index){
            getResponse(curreentQuestion.answers[index], index);
        }
    }

    useEffect(() => {
        console.log(curreentQuestion);
    }, [ curreentQuestion ])

    const HandleSendMessage = () => {
        if(text.length > 0){
            if(conversationId && text.length > 0){

                const index = answerOptions.findIndex(option => option === text.toUpperCase());
                if(curreentQuestion && index != -1){
                    getResponse(curreentQuestion.answers[index], index);

                }else{
                    getResponse(text, undefined)
                }
                setText("");
            }
        }
    }

    return (
        <div className="h-auto items-center absolute bottom-0 left-0 right-0">
        <div className="px-2 py-2 flex gap-3 bg-inherit/[0.4] backdrop-blur-sm">
            <label className="bg-base-100 input input-bordered flex items-center gap-5 grow bg-base" >
                <input disabled={false} type="text" className="grow flex-1" value={text} onChange={onTextChange} onKeyDown={handleEnterPress} placeholder="Send text message"/>
                {(isConfirmation || curreentQuestion)&&(answerOptions.map((c, i) => (<kbd key={i} onClick={() => submicAnswerByOption(i)}  className="kbd kbd-md cursor-pointer">{c}</kbd>)))}
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