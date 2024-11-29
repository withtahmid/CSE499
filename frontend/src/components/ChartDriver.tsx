import { useEffect, useState } from "react";
import { trpc } from "../trpc";
import LineGraph from "./LineChart";
const ChartDriver = () => {
    const [data, setData] =  useState(Array.from({ length: 8 }, (_, i) => 0));
    const [score, setScore] = useState(0);
    useEffect(() => {
        (async ()=> {
            try {
                const { distribution, score } = await trpc.scoreDistribution.query();
                setData(distribution)
                setScore(score)
            } catch (error) {
                
            }

        })();
    },[])

    return (
        <LineGraph data={data} highlightIndex={score} />
  ); 
}

export default ChartDriver;