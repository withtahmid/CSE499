import { useEffect, useState } from "react";
import RadioSelect from "./RadioSelect";
import { useAppDispatch, useAppSelector } from "../../store";
import { demographicInfoList } from "../../data/demographicData";
import { OTHER } from "../../data/demographicData";
import { startNewConversation } from "../../store/conversatioSlice";
import FirstInstruction from "./FirstInstruction";
import SubmitForm from "./LastPageMetadata";

const MetadataForm = () => {

    const dispatch = useAppDispatch()

    const [ btnActive, setbtnActive ] = useState(false);
    
    const [ index, setIndex ] = useState(0);
    const [ progressPercent, setProgressPercent ] = useState(0);
    const demographicInfo = useAppSelector (state => state.demographicInfo.list);
    const agreed = useAppSelector(state => state.demographicInfo.agreed);
    const status = useAppSelector(state => state.conversation.status);

    const questions = (() => {
        const tempQuestions = [ <FirstInstruction /> ]
        demographicInfoList.forEach((info, index) => {
            if(info.type === "radio"){
                tempQuestions.push(<RadioSelect index = {index} />);
            }
        });
        tempQuestions.push(<SubmitForm />);
        return tempQuestions
    })();

    
   const lastPage = index === (questions.length  - 1);
   const firstPage = index === 0;
    useEffect(() => {
        setbtnActive((() => {
            if(lastPage){
                return agreed;
            }
            for(let i = 0; i < index; ++i){
                const data = demographicInfo[i];
                if(data.selected === null || (data.otherValue === "" && data.selected === OTHER)){
                    return false;
                }
            }
            return true;
        })());
    }, [demographicInfo, index, agreed]);

    useEffect(() => {
        let cnt = 0;
        for(let i = 0; i < demographicInfo.length; ++i){
            const data = demographicInfo[i];
            if(!(data.selected === null || (data.otherValue === "" && data.selected === OTHER))){
                cnt++;
            }
        }
        setProgressPercent(Math.max(0, Math.ceil((cnt / demographicInfo.length) * 100)));
    }, [demographicInfo]);
    


    const goNext = () => setIndex(Math.min(questions.length, index + 1));

    const goPrevious = () => setIndex(Math.max(0, index - 1));
    
    const startConversation = () => {
        const demographicInfoParsed = demographicInfo.map(( { key, selected, otherValue }) => ({ key, selected: selected ?? "",  otherValue}))
        dispatch(startNewConversation({ demographicInfos: demographicInfoParsed }));
    };

    return (
        <div className="flex h-full w-full justify-center items-center  backdrop-blur-sm">
            <div className="flex flex-col bg-base-300 h-full w-full lg:w-6/12 lg:h-5/6 md:w-10/12 rounded-lg drop-shadow-2xl py-5">
                
                <div className="grow flex items-center p-5">
                    {questions[index]}
                </div>
                {!firstPage&&!lastPage&&(
                    <div className="w-full px-2">
                        <progress className="progress progress-primary w-full" value={progressPercent}  max="100">{progressPercent}</progress>
                    </div>
                )}
                <div className="join grid grid-cols-2 gap-2 p-2 md:max-w-8/12">
                    <button disabled={ index=== 0 } onClick={goPrevious} className="btn ">Previous</button>
                    <button disabled={ !btnActive } onClick={!lastPage ? goNext : startConversation} className="btn btn-primary">{ !lastPage ? "Next" : status === "creating" ? (<span className="loading loading-spinner loading-md"></span>): "Start Conversation"}</button>
                </div>
                
            </div>
        </div>
    );
}

export default MetadataForm;