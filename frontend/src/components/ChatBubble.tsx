import MessageSchema from "../types/Message"
import ChatBubbleReport from "./ChatBubbleReport";
import ConfirmationBubble from "./ConfirmationDetailsBubble"
const ChatBubble = ({ message } : { message: MessageSchema }) => {
    
    if(message.sender === "Patient"){
        return (
            <div className="chat chat-end">
               <div className="chat-bubble">
                    {message.text}
                </div>
            </div>
        )
    }

    if(message.isConfirmation){
        return (<ConfirmationBubble message={ message } />);
    }else if(message.isReport){
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
                    src="src/assets/images/Wall-E.png" />
                </div>
            </div>
            <div className="chat-bubble">
                {message.text}
                {message.question && message.question.answers.length !== 0 &&(
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