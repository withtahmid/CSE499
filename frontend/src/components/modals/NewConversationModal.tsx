import { OTHER } from "../../data/demographicData";
import { useAppDispatch, useAppSelector } from "../../store";
import { clearConversation, startNewConversation } from "../../store/conversatioSlice";
import { resetDemographicForm } from "../../store/demographicInfoSlice";
const NewConversationModal = () => {

    const dispatch = useAppDispatch();
    const demographicInfo = useAppSelector(state => state.demographicInfo.list);
    const resetText = () => {
        if(demographicInfo.findIndex( i => i.selected !== null) === -1){
            return;
        }
        for(let i = 0; i < demographicInfo.length; ++i){
            const data = demographicInfo[i];
            if(data.selected === null || (data.otherValue === "" && data.selected === OTHER)){
                return;
            }
        }
        const demographicInfoParsed = demographicInfo.map(( { key, selected, otherValue }) => ({ key, selected: selected ?? "",  otherValue}))
        dispatch(startNewConversation({ demographicInfos: demographicInfoParsed }));
    }

    const resetEverything = () => {
        dispatch(clearConversation());
        dispatch(resetDemographicForm());
    }


    return (
    <dialog id="new-conversation-modal" className="modal">
        <div className="modal-box">
            <h3 className="font-bold text-lg">Clear Conversation</h3>
            <p className="py-4">Proceeding will start new conversation thread and you will not be able to come back to this conversation again. Are you sure want to start new conversation?</p>
            <div className="modal-action">
            <form method="dialog">
               <div className="flex gap-3">
                    <button className="btn " >Close</button>
                    <button onClick={resetText} className="btn btn-primary">Clear Texts</button>
                    <button onClick={resetEverything} className="btn btn-error">Clear All</button>
               </div>
            </form>
            </div>
        </div>
    </dialog>
    )
}

export default NewConversationModal;