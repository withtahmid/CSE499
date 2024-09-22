import { useAppDispatch } from "../store";
import MessageSchema from "../types/Message";
import { adjustScore } from "../store/conversatioSlice";
const answerOptions = ["A", "B", "C", "D"];
const ConfirmationBubble = ({ message } : { message: MessageSchema }) => {

    const dispatch = useAppDispatch();

    if(!message.confirmationDetails) {
        return(
            <div className="text-center my-5 opacity-[0.3]">
                Something went wrong
            </div>
        )
    }

    const confirmAnswer = (score: number) => {
        dispatch(adjustScore({ _id: message._id, score: score }));
    }

    const { confirmationDetails } = message; 
    return(
        <div className="text-center my-6 px-6 opacity-[0.6]">
                {!confirmationDetails.confirmed ? 
                (<>
                <p className="text-balance"><strong>"{answerOptions[confirmationDetails.score]}. {confirmationDetails.answer}"</strong> is considered your answer. If that was mistaken please adjust by clicking one of the options.
                {  answerOptions
                    .map((c, i) => ({c, i}))
                    .filter((_, i) => i != confirmationDetails.score)
                    .map(({ c, i }) => 
                        (<kbd 
                            key={`${message._id}-${i}`} 
                            onClick={() => confirmAnswer(i)}  className="kbd kbd-sm cursor-pointer ml-1 hover:border-2 hover:font-bold">
                                {c}
                        </kbd>))
                }
                </p>
                </>)
                :
                (<>
                    <p>Thanks for confirming <strong>"{answerOptions[confirmationDetails.score]}. {confirmationDetails.answer}"</strong> as your answer.</p>
                </>)    
            }
        </div>
    )
}

export default ConfirmationBubble;