import { useAppSelector } from "../store";

const SuggessionBubble = () => {
    const suggessionText = useAppSelector(state => state.chatContainer.suggessionText);
    return (
        <div className="chat chat-end">
            <div className="chat-bubble skeleton">
                <span className="opacity-[0.6]">{suggessionText}</span>
            </div>
        </div>
    )
}

export default SuggessionBubble;