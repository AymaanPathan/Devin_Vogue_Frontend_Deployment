/* eslint-disable react/prop-types */
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import Sidebar from "./Sidebar.jsx";

// Register the components you need
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ chartData }) => {
  const options = {
    plugins: {
      legend: {
        position: "right", // Position the legend to the right
      },
    },
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <Sidebar />
      <div className="flex-1 flex items-center justify-center p-4 overflow-y-auto">
        <div className="w-full h-64 md:h-72 lg:h-3/4">
          <Pie data={chartData} options={options} />
        </div>
      </div>
    </div>
  );
};

export default PieChart;
