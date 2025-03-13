import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend);

const Chartdata = ({ orders }) => {
  const statusCount = orders.reduce((acc, curr) => {
    const { status } = curr;
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});

  const data = {
    datasets: [
      {
        data: Object.values(statusCount),
        backgroundColor: ["#61bc84", "#c6ffe6", "#8FBC8F"],
        hoverBackgroundColor: ["#61bc84", "#c6ffe6", "#8FBC8F"],
      },
    ],
    labels: Object.keys(statusCount),
  };
  return (
    <div className="bg h-96 w-80 rounded-xl bg-[#454545] p-5">
      <Doughnut
        data={data}
        options={{
          cutout: "60%",
          animation: { animateScale: true },
          plugins: {
            legend: {
              display: true,
              labels: {
                color: "#e0e0e0",
                font: {
                  size: 12,
                  family: "Manrope",
                },
              },
            },
          },
        }}
      />
    </div>
  );
};

export default Chartdata;
