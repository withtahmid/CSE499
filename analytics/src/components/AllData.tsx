import { useAppSelector } from "../store"
import LineGraph from "./LineChart";

const AllData = () => {
    const conversations = useAppSelector(state => state.core.conversations);
    const scores = conversations.filter(con => con.isFinished === true).map(con => con.obtainedScore);
    const d = {
        normal: 0,
        mild: 0,
        borderline: 0,
        moderate: 0,
        severe: 0,
        extreme: 0
    }
    for(let i = 0; i < scores.length; ++i){
        const s = scores[i];
        if(s > 40) d.extreme ++;
        else if(s >= 31) d.severe ++;
        else if(s >= 21) d.moderate ++;
        else if(s >= 17) d.borderline ++;
        else if(s >= 11) d.mild ++;
        else d.normal++;
    }


    const distribution = Object.entries(d).map(([k, v]) => v)
    distribution.unshift(0);
    distribution.push(0);

    distribution[0] = NaN;
    distribution[distribution.length - 1] = NaN;

    return  <div className="p-10">
                <LineGraph data={distribution}/>
            </div>
}

export default AllData;