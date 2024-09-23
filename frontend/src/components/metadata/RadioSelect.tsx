import React, { useState } from "react";
import { OTHER } from "../../data/formData";
import { useAppDispatch, useAppSelector } from "../../store";
import { demographicInfoList } from "../../data/demographicData";
import { setDemographicInfo } from "../../store/demographicInfoSlice";
const RadioSelect = ({ index }: { index: number }) => {
   
    const dispatch = useAppDispatch();
    
    const setValue = ( selected: string | null | string[], otherValue: string ) => {
        dispatch(setDemographicInfo({index,  selected, otherValue }));
    }

    const demographicInfo = useAppSelector(state => state.demographicInfo.list);
    const value = demographicInfo[index];
    const demoInfoQ = demographicInfoList[index]; 
    if(!value || !demoInfoQ){
        return <></>
    }

    const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selected = e.target.value ?? null;
        setValue(selected, value.otherValue);
    }

    const onTextChange = (e: React.ChangeEvent<HTMLInputElement> ) => {
       const otherValue = e.target.value ?? "";
       setValue(value.selected, otherValue);
    }
    
    return (
        <div className="flex flex-col items-center justify-center w-full">
            <div className="max-w-9/12 w-9/12 p-10 flex flex-col items-center">
                <div>
                    <h1 className="mb-1 text-2xl font-bold text-balance">{demoInfoQ.question}</h1>
                    <div className="pl-2 flex flex-col gap-3">
                        {demoInfoQ.options.map((option) => (
                            <div className="form-control" key={option.replace(/ /g, '-')}>
                                <label className="flex items-center py-1 mb-1 gap-3 cursor-pointer">
                                <input
                                    checked={option === value.selected}
                                    onChange={handleOptionChange}
                                    value={option}
                                    type="radio"
                                    name={`radio-form-${demoInfoQ.key}`} 
                                    className="radio radio-md border-2  checked:bg-primary"/>
                                <span className="label-text-lg">{option}</span>
                                {option==OTHER&&(<input disabled={value.selected !== OTHER} value={value.otherValue} onChange={onTextChange} type="text" placeholder="Please specify" className="input input-bordered w-full max-w-xs" />)}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RadioSelect;