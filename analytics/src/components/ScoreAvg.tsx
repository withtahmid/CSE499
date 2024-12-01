import { useAppSelector } from "../store";
import BarChart from "./BarChart";

const ScoreAvg = () =>{
    const conversations = useAppSelector(state => state.core.conversations);
    const data = new Array(21).fill(0);
    let cnt = 0;
    conversations.filter(c => c.isFinished)
    .forEach(c => {
        cnt ++;
        for(let i = 0; i < 21; i++){
            data[i] += c.scores[i].score
        }
    })
    for(let i = 0; i < 21; i++){
        data[i] /= cnt;
    }
   

    const labels = data.map((_, index) => `${index + 1}`);

    // Generate background and border colors dynamically
    const backgroundColors = data.map(() => "rgba(75, 192, 192, 0.2)");
    const borderColors = data.map(() => "rgba(75, 192, 192, 1)");
  
    const barChartData = {
      labels: labels, // Labels for the bars
      datasets: [
        {
          label: "Data Values",
          data: data,
          backgroundColor: backgroundColors,
          borderColor: borderColors,
          borderWidth: 1,
        },
      ],
    };
  
    const barChartOptions = {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        tooltip: {
          enabled: true,
        },
      },
      scales: {
        x: {
          title: {
            display: true,
            text: "Index",
          },
        },
        y: {
          title: {
            display: true,
            text: "Value",
          },
          beginAtZero: true,
        },
      },
    };
  
    return (
      <div style={{ width: "80%", margin: "auto" }}>
        <h1>Bar Chart Visualization</h1>
        <BarChart data={barChartData} options={barChartOptions} />
      </div>
    );

}
export default ScoreAvg;


/*
data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string[];
      borderColor?: string[];
      borderWidth?: number;
    }[];
  };
*/