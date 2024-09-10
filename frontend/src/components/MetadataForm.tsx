import { useEffect, useState } from "react";
import RadioSelect from "./RadioSelect";
import { trpc } from "../trpc";
import { 
    educationLevelSelect,
    genderSelect,
    locationSelect,
    occupationSelect,
    maritalStatusSelect,
    socioeconomicStatusSelect,

 } from "../data/formData";
import { useAppDispatch } from "../store";

import { startNewConversation } from "../store/conversatioSlice";

const MetadataForm = ( { closeModal } : { closeModal: (arg:any) => void } ) => {

    const dispatch = useAppDispatch();
    

    const submitForm = async () => {
        const metadata = [education, gender, location, occupation, maritialStatus, economicStatus];
        dispatch(startNewConversation({ metadata }));
    }
    const [ education, setEducation ] = useState("");
    const [ gender, setGender ] = useState("");
    const [ location, setLocation ] = useState("");
    const [ occupation, setOccupation ] = useState("");
    const [ maritialStatus, setMaritialStatus ] = useState("");
    const [ economicStatus, setEconomicStatus ] = useState("");

    if(1 == 1){
        return (
            <div className="bg-base-200 flex justify-center">
                <div className="h-full w-full overflow-y-scroll flex flex-col gap-3 py-10">
                    <RadioSelect options={educationLevelSelect} setValue={setEducation}/>
                    <RadioSelect options={genderSelect} setValue={setGender}/>
                    <RadioSelect options={locationSelect} setValue={setLocation}/>
                    <RadioSelect options={maritalStatusSelect} setValue={setMaritialStatus}/>
                    <RadioSelect options={occupationSelect} setValue={setOccupation}/>
                    <RadioSelect options={socioeconomicStatusSelect} setValue={setEconomicStatus}/>
                    <div className="flex justify-center w-fullp-3">
                        <button onClick={submitForm} className="btn btn-wide btn-primary">Wide</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default MetadataForm;