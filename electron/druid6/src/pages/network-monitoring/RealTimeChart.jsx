import React from "react";
import { Bar } from "react-chartjs-2";
import "chartjs-plugin-streaming";
// import "./styles.css";
import moment from "moment";

const Chart = require("react-chartjs-2").Chart;

const chartColors = {
  red: "rgb(255, 99, 132)",
  orange: "rgb(255, 159, 64)",
  yellow: "rgb(255, 205, 86)",
  green: "rgb(75, 192, 192)",
  blue: "rgb(54, 162, 235)",
  purple: "rgb(153, 102, 255)",
  grey: "rgb(201, 203, 207)",
};

// const color = Chart.helpers.color;
const data = {
  datasets: [
    {
      label: "Dataset 1 (linear interpolation)",
      backgroundColor: "rgb(255, 159, 64)",
      borderColor: chartColors.red,
      fill: false,
      lineTension: 0,
      borderDash: [8, 4],
      data: [],
    },
  ],
};

const options = {
  elements: {
    line: {
      tension: 0.5,
    },
  },
  scales: {
    x: {
      type: "realtime",
      distribution: "linear",
      realtime: {
        onRefresh: function (chart) {
          chart.data.datasets[0].data.push({
            x: moment(),
            y: Math.random(),
          });
        },
        delay: 3000,
        time: {
          displayFormat: "h:mm",
        },
      },
      ticks: {
        displayFormats: 1,
        maxRotation: 0,
        minRotation: 0,
        stepSize: 1,
        maxTicksLimit: 30,
        minUnit: "second",
        source: "auto",
        autoSkip: true,
        callback: function (value) {
          return moment(value, "HH:mm:ss").format("mm:ss");
        },
      },
    },

    y: {
      ticks: {
        beginAtZero: true,
        max: 1,
      },
    },
  },
};

export default function RealTimeChart() {
  return <Bar data={data} options={options} />;
}
