import { Pie } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const CandidatePieChart = ({ steps, candidates }) => {
    const stepCounts = steps.map(
        (step) => candidates.filter((cand) => cand.pipelineStep === step).length
    );

    const backgroundColors = [
        "rgba(33, 118, 255, 0.5)",
        "rgba(75, 192, 192, 0.5)",
        "rgba(255, 206, 86, 0.5)",
        "rgba(153, 102, 255, 0.5)",
        "rgba(255, 159, 64, 0.5)",
        "rgba(255, 99, 132, 0.5)",
    ];

    const borderColors = [
        "rgba(33, 118, 255, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
        "rgba(255, 99, 132, 1)",
    ];

    const data = {
        labels: steps,
        datasets: [
            {
                label: "Number of Candidates",
                data: stepCounts,
                backgroundColor: backgroundColors,
                borderColor: borderColors,
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: "Candidates by Pipeline Step",
            },
        },
    };

    return <Pie data={data} options={options} />;
};

export default CandidatePieChart;