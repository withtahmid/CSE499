import MessageSchema from "../types/Message"
import ChatBubbleReport from "./ChatBubbleReport";
import ConfirmationBubble from "./ConfirmationDetailsBubble"
import ChatBotImage from '../../src/assets/images/Chatbot.png'
import { useEffect, useState } from "react";
import { resolve } from "path";





const ChatBubble = ({ message, idx }: { message: MessageSchema, idx: any }) => {

    const [botMessage, setBotMessage] = useState('');
    const [stream, setStream] = useState('');

    const getNxtChar = (text: String, i: any) => {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(text[i])
            }, 0);
        });

    };


    const startStream = async (text: String) => {
        for (let i = 0; i < text.length; ++i) {
            let nxt = await getNxtChar(text, i);
            setStream(stream => stream + nxt)
        }
    }

    useEffect(() => {
        setBotMessage(message.text);

        startStream(message.text);


    }, [message])

    if (message.sender === "Patient") {
        return (
            <div className="chat chat-end">
                <div className="chat-bubble">
                    {message.text}
                </div>
            </div>
        )
    }

    if (message.isConfirmation) {
        return (<ConfirmationBubble message={message} />);
    } else if (message.isReport) {
        // console.log(message)
        return <ChatBubbleReport message={message} />
    }

    // const questioning
    return (
        <div className="chat chat-start">
            <div className="chat-image avatar">
                <div className="w-10 p-1 rounded-full bg-white bg-opacity-[0.5]">
                    <img
                        alt="Bot"
                        src={ChatBotImage} />
                </div>
            </div>
            <div className="chat-bubble">
                {message.text}
                {/* {idx} */}
                {message.question && message.question.answers.length !== 0 && (
                    <div className="pl-3 flex flex-col gap-2 pt-1">
                        <p><strong>A.</strong> {message.question.answers[0]}</p>
                        <p><strong>B.</strong> {message.question.answers[1]}</p>
                        <p><strong>C.</strong> {message.question.answers[2]}</p>
                        <p><strong>D.</strong> {message.question.answers[3]}</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ChatBubble;