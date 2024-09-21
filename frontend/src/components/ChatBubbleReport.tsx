import MessageSchema from "../types/Message"
const ChatBubbleReport = ({ message } : { message: MessageSchema}) => {
    if(!message.isReport || !message.reportDetails){
        return <p></p>;
    }
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
                <p>Your BDI score is <strong>{message.reportDetails.score}.</strong></p>
                <p>You have <strong>{message.reportDetails.depressionLevel}</strong> </p>
                <p>{message.reportDetails.comment}</p>
            </div>
        </div>
    )
}
export default ChatBubbleReport;