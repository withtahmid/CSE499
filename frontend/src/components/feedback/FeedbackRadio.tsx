import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { setFeedbackRadioValue } from "../../store/feedbackFormSlice";
import { feedbacksPoints } from "./data";
import { GoDotFill } from "react-icons/go";
const FeedbackRadio = ({ index } : { index: number }) =>{

    const dispatch = useAppDispatch();
    const points = useAppSelector(state => state.feedbackFrom.feedback);
    const value = points[index];
    const description = feedbacksPoints[index];

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(event.target.value);
        if(value !== undefined){
            dispatch(setFeedbackRadioValue({index, value}));
        }
    }
    return (
        <div className="flex px-5 justify-between itmes-center  hover:bg-base-100 rounded-lg py-1">
            <div className="max-w-7/12 w-7/12 flex items-center gap-2">
                <div><GoDotFill/></div>
                <p className="text-balance">{description}</p>
            </div>
            <div className="flex min-w-4/12 w-4/12 justify-between items-center">
                {([ 0,  1, 2, 3, 4 ] as number[]).map((i) => (
                    <input onChange={handleChange} value={i} checked={value === i} type="radio" key={`${i}-${index}`} name={`feedback-${index}`} className="radio radio-sm radio-primary checked:border-2" />
                ))}
            </div>
        </div>
    )
}

export default FeedbackRadio;