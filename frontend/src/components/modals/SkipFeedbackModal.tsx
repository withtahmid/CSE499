import { useAppDispatch } from "../../store";
import { setCurrentpage } from "../../store/containerSlice";
import { clearConversation } from "../../store/conversatioSlice";
import { resetDemographicForm } from "../../store/demographicInfoSlice";

const SkipFeedbackModal = () => {

    const dispatch = useAppDispatch();

    const resetEverything = () => {
        dispatch(resetDemographicForm());
        dispatch(clearConversation());
        dispatch(setCurrentpage("form"));
    }
    return (
        <dialog id="feedback-skip-modal" className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Skip Feedback</h3>
                <p className="py-4">Your feedback is valuable for us for further improvements. Are you sure want to skip the feedback form?</p>
                <div className="modal-action">
                <form method="dialog">
                    <div className="flex gap-5">
                    <button className="btn btn-primary">Close</button>
                    <button onClick={resetEverything} className="btn">Skip anyway</button>
                    </div>
                </form>
                </div>
            </div>
        </dialog>
    )
}

export default SkipFeedbackModal;