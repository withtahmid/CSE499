import { useAppDispatch } from "../../store";
import { setCurrentpage } from "../../store/containerSlice";
import { clearConversation } from "../../store/conversatioSlice";
import { resetDemographicForm } from "../../store/demographicInfoSlice";

const FeebackSuccessModal = () => {

    const dispatch = useAppDispatch();

    const resetEverything = () => {
        dispatch(resetDemographicForm());
        dispatch(clearConversation());
        dispatch(setCurrentpage("form"));
    }
    return (
        <dialog id="feedback-success-modal" className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Submitted</h3>
                <p className="py-4">Thanks for your feedback.</p>
                <div className="modal-action">
                <form method="dialog">
                    <button onClick={resetEverything} className="btn btn-primary">Close</button>
                </form>
                </div>
            </div>
        </dialog>
    )
}

export default FeebackSuccessModal;