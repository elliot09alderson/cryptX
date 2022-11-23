import React from "react";
import { Line } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
const Chart = ({ arr = [], currency, days }) => {
  const prices = [1, 2, 3, 4];
  const date = ["12/12/12", "2/1/12", "21,2,32"];
  for (let i = 0; i < arr.length; i++) {
      if(days==='24h')
      {date.push(new Date(arr[i][0]).toLocaleTimeString());}
      else{date.push(new Date(arr[i][0]).toLocaleDateString());}
      prices.push(arr[i][1]);

    
  }
  data={
    labels: date,
    datasets: [
      {
        label: `price in ${currency}`,
        data: prices,
        borderColor: "rgb(255,99,232)",
        backgroundColor: "rgba(255,99.132.0.5)",
      },
    ],
  }
  return (

    <Line options={{ responsive: true }}
      data={data}
    />
  );
};

export default Chart;
