import { useAppDispatch, useAppSelector } from "../../store";
import { toggleAgreed } from "../../store/demographicInfoSlice";
const instructions = [
   
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
                <h1 className="text-3xl font-bold">Privacy Policy Acknowledgment</h1>
                <div className="py-5 ">
                    <p>We value your privacy and want to assure you that any information you provide will be handled with the utmost care. While your demographic and conversational data may be stored for research purposes, please note the following points:</p>
                    <ul className="list-disc list-inside flex flex-col gap-4 p-5">
                        <li className="text-balance"><strong>Anonymity: </strong> All data will be anonymized and will not contain any personally identifiable information. Your responses will not be linked to your identity in any way.</li>
                        <li className="text-balance"><strong>Data Security: </strong> We employ rigorous security measures to ensure that your information is protected and used solely for research purposes.</li>
                        <li className="text-balance"><strong>No Identification: </strong>This application does not require any login or identification, and no device information will be stored</li>
                    </ul>
                </div>
                <div className="flex items-center gap-3">
                    <input 
                        onChange={() => dispatch(toggleAgreed())} 
                        id="i-understand-checkbot" 
                        type="checkbox" 
                        checked={agreed} 
                        className="checkbox checkbox-primary" 
                    />
                    <label className="cursor-pointer text-balance" htmlFor="i-understand-checkbot">I acknowledge and accept the terms of the privacy policy regarding my information.</label>
                </div>
                </div>
            </div>
        </div>
    )
}
export default LastPageMetadata;


/*

Here’s a more formal and clear version of your privacy policy message:

---

**Privacy Policy Acknowledgment**

We value your privacy and want to assure you that any information you provide will be handled with the utmost care. While your demographic and conversational data may be stored for analytical purposes, please note that:

1. **Anonymity**: All data will be anonymized and will not contain any personally identifiable information. Your responses will not be linked to your identity in any way.

2. **Data Security**: We employ rigorous security measures to ensure that your information is protected and used solely for research purposes.

3. **No Identification**: This application does not require any login or identification, and no device information will be stored.

By clicking the checkbox below, you confirm that you understand and agree to these terms.

[ ] I understand and agree to the terms and conditions.

---

Feel free to adjust any part to better fit your app's tone!
*/