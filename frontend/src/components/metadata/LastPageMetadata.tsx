import { useAppDispatch, useAppSelector } from "../../store";
import { toggleAgreed } from "../../store/demographicInfoSlice";
const instructions = [
    `You will be asked 21 questions from "Beck's Depression Inventory (BDI)"`,
    // `Four possible answers will be provided (A, B, C, D)`,
    // `You can click on buttons provided into the typinig area to answer specificly, or`,
    // `You can answer by typing related to the given answers in your words`,
    // `You will be given feedback for which  `
    `After the question-answer session, you will be instructed about your BDI score and your mental health condition`,
    `Your personal information will be used for analytical purpose but won't be mapped to your identification`,
];


const Highlight = ({ text } : { text:string }) => {
    return <strong><em>{text}</em></strong>
}

const LastPageMetadata = () => {
    const agreed = useAppSelector(state => state.demographicInfo.agreed);
    const dispatch = useAppDispatch();
    return(
        <div className="hero bg-base-300 min-h-full">
            <div className="hero-content">
                <div className="w-full">
                <h1 className="text-5xl font-bold">Instructions</h1>
                <ul className="py-6 list-disc list-outside flex flex-col gap-4">
                    <li>
                    You will be presented with 21 questions from the <Highlight text="Beck Depression Inventory (BDI)"/>. Upon completion of the questionnaire, you will receive guidance regarding your BDI score and an overview of your mental health status.
                    </li>
                    <li>
                    Please note that while your personal metadata, such education, gender, may be stored for later analytical purposes, no personally identifiable information will be stored. <strong>The data will remain anonymous and will not be linked to any specific individual.</strong>
                    </li>
                </ul>
                <div className="flex items-center gap-3">
                    <input 
                        onChange={() => dispatch(toggleAgreed())} 
                        id="i-understand-checkbot" 
                        type="checkbox" 
                        checked={agreed} 
                        className="checkbox checkbox-primary" 
                    />
                    <label className="cursor-pointer" htmlFor="i-understand-checkbot">I understand and agree to the terms and conditions.</label>
                </div>
                </div>
            </div>
        </div>
    )
}
export default LastPageMetadata;