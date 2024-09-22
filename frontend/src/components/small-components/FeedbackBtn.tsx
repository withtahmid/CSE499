import { useAppDispatch } from "../../store";
import { setCurrentpage } from "../../store/containerSlice";

const FeedbackBtn = () => {

    const dispatch = useAppDispatch();
    const gotoFeedbackPage = () => {
        dispatch(setCurrentpage("feedback"));
    }
    return (
        <div className="text-center pt-6 pb-2 flex items-center justify-center gap-3 ">
            <p className="skeleton">Please take two minutes to give us your feedback.</p>
            <button  
                onClick={gotoFeedbackPage}
                className="btn btn-primary btn-sm">Give feedback</button>
        </div>
    )
}
export default FeedbackBtn;