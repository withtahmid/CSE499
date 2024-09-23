import MessageSchema from "../types/Message"
const ChatBubbleReport = ({ message } : { message: MessageSchema}) => {
    if(!message.isReport || !message.reportDetails){
        return <p></p>;
    }

    const skipFirstTwoSentences = (str: string): { report: string, rest: string } => {
        let firstPeriodIndex = str.indexOf('.');
        if (firstPeriodIndex === -1) return { report: str, rest: '' };
    
        let report = str.slice(0, firstPeriodIndex + 1).trim();
        let rest = str.slice(firstPeriodIndex + 1).trim();
    
        return { report, rest };
    }

    const { report , rest } = skipFirstTwoSentences(message.reportDetails.comment);

    // const pref
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
                <strong className="text-lg">{report}</strong> {rest}
            </div>
        </div>
    )
}
export default ChatBubbleReport;