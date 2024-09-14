import { useEffect, useState } from "react";
import RadioSelect from "./RadioSelect";
import { trpc } from "../../trpc";
import { 
    educationLevelSelect,
    genderSelect,
    locationSelect,
    occupationSelect,
    maritalStatusSelect,
    socioeconomicStatusSelect,
    OTHER,

 } from "../../data/formData";


 import {
    setEducation, 
    setGender
 }from "../../store/metadataSlice"

import { useAppDispatch, useAppSelector } from "../../store";

import { startNewConversation } from "../../store/conversatioSlice";
import FirstInstruction from "./FirstInstruction";
import SubmitForm from "./LastPageMetadata";

const MetadataForm = () => {

    const dispatch = useAppDispatch()

    const [ btnActive, setbtnActive ] = useState(false);
    const [ index, setIndex ] = useState(0);
    const metadata = useAppSelector (state => state.metadata);
    const { education, gender } = metadata;

    const status = useAppSelector(state => state.conversation.status);

    const isOk = () => {
        const datas = Object.entries(metadata);
        for(let i = 0; i < index; ++i){
            const [ _ , data] = datas[i];
            if(typeof data === "boolean"){
                if(!data){
                   return false;
                }
            }
            else if(data.selected === null || (data.otherValue === "" && data.selected === OTHER)){
                return false;
            }
        }
        return true;
    }
   


    useEffect(() => {
        setbtnActive(isOk());
    }, [metadata, index])

    const questions = [ 
        <FirstInstruction />,
        <RadioSelect options={educationLevelSelect} value={education} setValue={setEducation}/>,
        <RadioSelect options={genderSelect} value={gender}  setValue={setGender}/>,
        // <RadioSelect options={locationSelect} setValue={setLocation}/>,
        // <RadioSelect options={maritalStatusSelect} setValue={setMaritialStatus}/>,
        // <RadioSelect options={occupationSelect} setValue={setOccupation}/>,
        // <RadioSelect options={socioeconomicStatusSelect} setValue={setEconomicStatus}/>,
        <SubmitForm />
    ];

    const goNext = () => {
        setIndex(Math.min(questions.length, index + 1));
    }

    const goPrevious = () => {
        setIndex(Math.max(0, index - 1));
    }

    const startConversation = () => {
        dispatch(startNewConversation({metadata: []}));
    };
     
    const lastPage = index < (questions.length  - 1);
    // fixed top-0 bottom-0 left-0 right-0 z-50 
    return (
        <div className="flex h-full w-full justify-center items-center  backdrop-blur-sm">
            <div className="flex flex-col bg-base-300 h-5/6 w-7/12 rounded-lg drop-shadow-2xl">
                <div className="grow flex items-center p-5">
                    {questions[index]}
                </div>
                <div className="join grid grid-cols-2 gap-2 p-2">
                    <button disabled={ index=== 0 } onClick={goPrevious} className="btn ">Previous</button>
                    <button disabled={ !btnActive } onClick={lastPage ? goNext : startConversation} className="btn btn-primary">{ lastPage ? "Next" : status === "creating" ? (<span className="loading loading-spinner loading-md"></span>): "Start Conversation"}</button>
                </div>
            </div>
        </div>
    );
}

export default MetadataForm;