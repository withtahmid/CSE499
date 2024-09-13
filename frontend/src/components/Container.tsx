import { useEffect } from "react";
import { useAppSelector } from "../store";
import ChatContainer from "./ChatContainer";
import MetadataForm from "./MetadataForm";
import { useToast } from "./ToastProvider";
const Container = () => {

    const { addToast } = useToast();

    const error = useAppSelector(state => state.conversation.error);

    const openForm = (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | undefined) => {
        if(event){
            event.preventDefault();
        }
        const modal = document.getElementById('metadata-modal') as HTMLDialogElement | null;
        if (modal) {
            modal.showModal();
        }
    };

    const closeForm = (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | undefined) => {
        if(event){
            event.preventDefault();
        }
        const modal = document.getElementById('metadata-modal') as HTMLDialogElement | null;
        if (modal) {
            modal.close();
        }
    };

    useEffect(() => {
        if(error){
            addToast(error.message, "error");
        }
    }, [error])

    const conversationId = useAppSelector(state => state.conversation._id);
    return (
        <div className="h-full w-full overflow-y-auto overflow-x-hidden  bg-base-200">
            {
                conversationId ? <ChatContainer /> : <MetadataForm closeModal={closeForm}/>
            }
        </div>
    )

}

export default Container;