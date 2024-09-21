import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import FeedbackRadio from "./FeedbackRadio";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";
import { resetFeedbackForm, submitFeedback } from "../../store/feedbackFormSlice";
import { useToast } from "../toast/ToastProvider";
const FeedBackForm = () => {

    const { addToast } = useToast();

    const points = useAppSelector(state => state.feedbackFrom.feedback);   
    const [ submitActive, setSubmitActive ] = useState(false);
    const status = useAppSelector(state => state.feedbackFrom.status);
    const dispatch = useAppDispatch();

    const showSuccessModal = () => {
        const modal = document.getElementById('feedback-success-modal') as HTMLDialogElement
        if(modal && status === "submitted"){
            modal.showModal()
        }
    }
    

    useEffect(() => {
        setSubmitActive(points.findIndex(p => p === null) === -1)
    }, [points])

    useEffect(() => {
        if(status === "submitted"){
            dispatch(resetFeedbackForm());
            showSuccessModal();
            // addToast("Feedback successfully submitted", "success");
        }else if(status === "failed"){
            addToast("Failed to submit feedback", "error");
        }
    }, [status]);

    const handleSubmitFeedback = () => {
        if(points.includes(null)){
            return;
        }
        dispatch(submitFeedback(points as number[]));
    }

    return (
        <div className="flex h-full max-h-full w-full justify-center">
            <div className="h-full max-h-full p-5 flex flex-col bg-base-100 w-full md:w-8/12 lg:w-4/12 pt-5">
                <h1 className="text-4xl font-bold text-center mb-5">Feedback</h1>
                <div className="flex justify-end gap-10 px-6">
                    <span className="flex gap-2 items-center justify-between"><FaLongArrowAltLeft />  Disagree</span> 
                    <span className="flex gap-2 items-center justify-between">Agree  <FaLongArrowAltRight /></span>
                </div>
                <div className="flex flex-col gap-3 max-h-5/6 h-5/6 overflow-scroll">
                    {points.map((_, index) => (
                        <FeedbackRadio key={index}  index={index}/>
                    ))}
                </div>
                <div className="flex justify-center py-2 gap-10">
                    <button onClick={handleSubmitFeedback} disabled={!submitActive} className="btn btn-primary">
                        {status === "loading" ? (<span className="loading loading-spinner loading-md"></span>) : "Submit"}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default FeedBackForm;