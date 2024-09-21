import { useAppDispatch } from "../../store";
import { setCurrentpage } from "../../store/containerSlice";
import { clearConversation } from "../../store/conversatioSlice";

const FeebackSuccessModal = () => {

    const dispatch = useAppDispatch();

    const resetEverything = () => {
        dispatch(clearConversation());
        dispatch(setCurrentpage("form"));
    }
    return (
        <dialog id="feedback-success-modal" className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Hello!</h3>
                <p className="py-4">Press ESC key or click the button below to close</p>
                <div className="modal-action">
                <form method="dialog">
                    <button onClick={resetEverything} className="btn">Close</button>
                </form>
                </div>
            </div>
        </dialog>
    )
}

export default FeebackSuccessModal;