import BarChart from './BarChart';
const ChartDriver = ({ score } : { score: number }) => {
    const data = [12, 19, 3, 5, 2, 3]; 
    const labels = ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange']; 
    const backgroundColors = [ 'rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)' ]; 
    const borderColors = [ 'rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)' ];

    return ( <BarChart data={data} labels={labels} backgroundColors={backgroundColors} borderColors={borderColors} />)
}

export default ChartDriver;