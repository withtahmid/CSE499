import React, { useState } from "react";
import { OTHER } from "../data/formData";
interface SelectProps {
    options: string[];
    setValue: (arg:string) => void;
}

const RadioSelect = (props : SelectProps) => {

    const { options, setValue } = props;
    const [ text, setText ] = useState("");
    const [ selectedOther, setSelectedOther ] = useState(false);

    const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if(value === OTHER){
            setValue("");
        }else{
            setValue(value);
        }
        setSelectedOther(value === OTHER);
    }

    const onTextChange = (e:React.ChangeEvent<HTMLInputElement> ) => {
        const value = e.target.value;
        setText(value);
        setValue(value)
    }

    return (
        <div className="flex justify-center">
            <div className="w-2/6">
                <h1 className="mb-1 text-xl font-bold">{options[0]}</h1>
                <div className="pl-2">
                    {options.slice(1).map((option) => (
                        <div className="form-control" key={option.replace(/ /g, '-')}>
                            <label className="flex items-center py-1 mb-1 gap-3 cursor-pointer">
                            <input 
                                onChange={handleOptionChange}
                                value={option}
                                type="radio"
                                name={`radio-form-${options[0].replace(/ /g, '-')}`} 
                                className="radio border-2  checked:bg-primary"/>
                            <span className="label-text">{option}</span>
                            {option==OTHER&&selectedOther&&(<input value={text} onChange={onTextChange} type="text" placeholder="Please specify" className="input input-bordered w-full max-w-xs" />)}
                            </label>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default RadioSelect;