import MessageSchema from "../types/Message"
import ChatBotImage from '../../src/assets/images/Chatbot.png'
import ChartDriver from "./ChartDriver";
const ChatBubbleReport = ({ message }: { message: MessageSchema }) => {
    if (!message.isReport || !message.reportDetails) {
        return <p></p>;
    }

    const skipFirstTwoSentences = (str: string): { report: string, rest: string } => {
        let firstPeriodIndex = str.indexOf('.');
        if (firstPeriodIndex === -1) return { report: str, rest: '' };

        let report = str.slice(0, firstPeriodIndex + 1).trim();
        let rest = str.slice(firstPeriodIndex + 1).trim();

        return { report, rest };
    }

    const { report, rest } = skipFirstTwoSentences(message.reportDetails.comment);

    // const pref
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
                <strong className="text-lg">{report}</strong> {rest}
                <p>
            Higher scores indicate greater levels of depression. The categories are as follows:
                </p>
                <ul>
                    <li><strong>1-10:</strong> These ups and downs are considered normal.</li>
                    <li><strong>11-16:</strong> Mild mood disturbance.</li>
                    <li><strong>17-20:</strong> Borderline clinical depression.</li>
                    <li><strong>21-30:</strong> Moderate depression.</li>
                    <li><strong>31-40:</strong> Severe depression.</li>
                    <li><strong>Over 40:</strong> Extreme depression.</li>
                </ul>
                <p>
                    Study the score distribution graph below to better understand your score in comparison to others.
                </p>
                <ChartDriver />
            </div>
        </div>
    )
}
export default ChatBubbleReport;