import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

interface BarChartProps {
    data: number[];
    labels: string[];
    backgroundColors: string[];
    borderColors: string[];
}

const BarChart: React.FC<BarChartProps> = ({ data, labels, backgroundColors, borderColors }) => {
    const chartData = {
        labels: labels,
        datasets: [
            {
                label: '# of Votes',
                data: data,
                backgroundColor: backgroundColors,
                borderColor: borderColors,
                borderWidth: 1
            }
        ]
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    };

    return (
        <div>
            <Bar data={chartData} options={options} />
        </div>
    );
}

export default BarChart;
