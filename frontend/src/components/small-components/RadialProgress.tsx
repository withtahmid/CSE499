import { CSSProperties, useEffect, useState } from 'react';
import { useAppSelector } from '../../store';
interface CustomCSSProperties extends CSSProperties {
    '--value': string;
}
const RadialProgress = () => {

    const messages = useAppSelector(state => state.conversation.messages);
    const [ answered, setAnswered ] = useState(0);
    const [ progress, setProgress ] = useState(0);

    useEffect(() => {
        let count = 0;
        messages.forEach(m => {
            if((m.question && m.question.answers.length > 0) || m.isReport){
                count += 1;
            }
        });
        count = Math.min(21, Math.max(0, count - 1));
        setAnswered(count);
        const percent = Math.ceil((count / 21) * 100);
        setProgress(percent);
    }, [messages])
    return (
        <div 
        className="radial-progress bg-base-100  text-sm font-bold" 
        style={{ "--value": `${progress}`, "--size": "3rem", "--thickness": "3px" } as  CustomCSSProperties} role="progressbar">{answered} / 21</div>
    )
}
export default RadialProgress;