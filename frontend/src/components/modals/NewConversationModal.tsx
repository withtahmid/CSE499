import { useAppDispatch } from "../../store";
import { clearConversation } from "../../store/conversatioSlice";
import { resetDemographicForm } from "../../store/demographicInfoSlice";
const NewConversationModal = () => {

    const dispatch = useAppDispatch();

    const resetConv = () => {
        dispatch(clearConversation());
        dispatch(resetDemographicForm());
    }

    return (
    <dialog id="new-conversation-modal" className="modal">
        <div className="modal-box">
            <h3 className="font-bold text-lg">New Conversation</h3>
            <p className="py-4">Proceeding will start new conversation thread and you will not be able to come back to this conversation again. Are you sure want to start new conversation?</p>
            <div className="modal-action">
            <form method="dialog">
               <div className="flex gap-3">
                    <button className="btn btn-primary" >Close</button>
                    <button onClick={resetConv} className="btn">New Conversation</button>
               </div>
            </form>
            </div>
        </div>
    </dialog>
    )
}

export default NewConversationModal;