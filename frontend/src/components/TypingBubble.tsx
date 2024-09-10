import MessageSchema from "../types/message"
const TypingBubble = () => {
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
                <span className="loading loading-dots loading"></span>
            </div>
        </div>
    )
}

export default TypingBubble;