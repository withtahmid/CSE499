import { useAppDispatch } from "../store";
import MessageSchema from "../types/Message";
import { adjustScore, fetchPreviousConversation } from "../store/conversatioSlice";
import { IoReload } from "react-icons/io5";
const answerOptions = ["A", "B", "C", "D"];

const ErrorBubble = ({ error } : { error: string }) => {
    const dispatch = useAppDispatch();
    const reload = () => {
        dispatch(fetchPreviousConversation())
    }

    return(
        <div className="text-center my-6 px-6 ">
                <div className="badge badge-error gap-2 p-5">
                {error} <button onClick={reload} className="text-2xl bg-transparent"><IoReload /></button>
                </div>
        </div>
    )
}

export default ErrorBubble;