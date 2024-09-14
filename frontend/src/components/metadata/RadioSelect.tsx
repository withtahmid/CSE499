import React, { useState } from "react";
import { OTHER } from "../../data/formData";
import { Radio } from "../../store/metadataSlice";
import { useAppDispatch } from "../../store";
interface SelectProps {
    options: string[];
    value: Radio;
    setValue: (arg:Radio) => any;
}

const RadioSelect = (props : SelectProps) => {
    const { options, value,  setValue } = props;
    const selectedOther = value.selected === OTHER;
    const dispatch = useAppDispatch();

    const setValueFn = (value:Radio)=>{
        dispatch(setValue(value));
    }

    const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValueFn({
            ...value,
            selected: e.target.value
        })
    }

    const onTextChange = (e:React.ChangeEvent<HTMLInputElement> ) => {
        setValueFn({
        ...value,
        otherValue: e.target.value,
      })
    }
    
    return (
        <div className="flex flex-col items-center justify-center w-full">
            <div className="p-10 rounded-lg">
                <h1 className="mb-1 text-2xl font-bold">{options[0]}</h1>
                <div className="pl-2 flex flex-col gap-3">
                    {options.slice(1).map((option) => (
                        <div className="form-control" key={option.replace(/ /g, '-')}>
                            <label className="flex items-center py-1 mb-1 gap-3 cursor-pointer">
                            <input
                                checked={option === value.selected}
                                onChange={handleOptionChange}
                                value={option}
                                type="radio"
                                name={`radio-form-${options[0].replace(/ /g, '-')}`} 
                                className="radio radio-md border-2  checked:bg-primary"/>
                            <span className="label-text-lg">{option}</span>
                            {option==OTHER&&(<input disabled={value.selected !== OTHER} value={value.otherValue} onChange={onTextChange} type="text" placeholder="Please specify" className="input input-bordered w-full max-w-xs" />)}
                            </label>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default RadioSelect;