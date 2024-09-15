import { useAppDispatch } from "../../store";
import { clearConversation } from "../../store/conversatioSlice";
import { reset } from "../../store/metadataSlice";

const NewConversationModal = () => {

    const dispatch = useAppDispatch();

    const resetConv = () => {
        dispatch(clearConversation());
        dispatch(reset());
    }

    return (
    <dialog id="new-conversation-modal" className="modal">
        <div className="modal-box">
            <h3 className="font-bold text-lg">Hello!</h3>
            <p className="py-4">Press ESC key or click the button below to close</p>
            <div className="modal-action">
            <form method="dialog">
               <div className="flex gap-3">
                    <button className="btn" >Close</button>
                    <button onClick={resetConv} className="btn btn-error">New Conversation</button>
               </div>
            </form>
            </div>
        </div>
    </dialog>
    )
}

export default NewConversationModal;