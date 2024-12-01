import { useAppSelector } from "../store"
import LineGraph from "./LineChart";
import LineGraphMultiple from "./LineChartMultiple";

const MaleFemale = () => {
    const conversations = useAppSelector(state => state.core.conversations);
    const sample = conversations[0];

    if(sample){
        // console.log(sample.demographicInfos[1].selected === "Female")
        console.log(sample.scores)
    }

    

    const scores1 = conversations
    .filter(con => con.isFinished === true)
    .filter(con => con.demographicInfos[1].selected === "Female")
    .map(con => con.obtainedScore);

    const scores2 = conversations
    .filter(con => con.isFinished === true)
    .filter(con => con.demographicInfos[1].selected !== "Female")
    .map(con => con.obtainedScore);
    
    // console.log(scores1.length, scores2.length)
    
    const d1 = {
        normal: 0,
        mild: 0,
        borderline: 0,
        moderate: 0,
        severe: 0,
        extreme: 0
    }
    const d2 = {
        normal: 0,
        mild: 0,
        borderline: 0,
        moderate: 0,
        severe: 0,
        extreme: 0
    }
    for(let i = 0; i < scores1.length; ++i){
        const s = scores1[i];
        if(s > 40) d1.extreme ++;
        else if(s >= 31) d1.severe ++;
        else if(s >= 21) d1.moderate ++;
        else if(s >= 17) d1.borderline ++;
        else if(s >= 11) d1.mild ++;
        else d1.normal++;
    }
    for(let i = 0; i < scores2.length; ++i){
        const s = scores2[i];
        if(s > 40) d2.extreme ++;
        else if(s >= 31) d2.severe ++;
        else if(s >= 21) d2.moderate ++;
        else if(s >= 17) d2.borderline ++;
        else if(s >= 11) d2.mild ++;
        else d2.normal++;
    }


    const distribution1 = Object.entries(d1).map(([k, v]) => v)
    distribution1.unshift(0);
    distribution1.push(0);
    distribution1[0] = NaN;
    distribution1[distribution1.length - 1] = NaN;

    const distribution2 = Object.entries(d2).map(([k, v]) => v)
    distribution2.unshift(0);
    distribution2.push(0);
    distribution2[0] = NaN;
    distribution2[distribution2.length - 1] = NaN;




    return  <LineGraphMultiple 
    datasets={[
        {
          label: "Female",
          data: distribution2,
          borderColor: "rgba(0, 123, 255, 1)",
        },
        {
          label: "Male",
          data: distribution1,
          borderColor: "rgba(255, 99, 132, 1)",
        },
      ]}
    />
}

export default MaleFemale;