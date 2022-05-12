import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';
import { range } from '../../services/utils';

import './LiveTrafficChart.scss';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  maintainAspectRatio: false,
  plugins: {
    title: {
      display: false,
    },
  },
  responsive: true,
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};

const labels = range(1, 31);
const transmitData = labels.map(() => faker.datatype.number({ min: 0, max: 1000 }));
const recieveData = labels.map(() => faker.datatype.number({ min: 0, max: 1000 }));
const txRxSumData = labels.map((ele, idx) => transmitData[idx] + recieveData[idx]);

export const data = {
  labels,
  datasets: [
    {
      label: 'Transmit',
      data: transmitData,
      backgroundColor: 'rgb(255, 99, 132)',
    },
    {
      label: 'Receive',
      data: recieveData,
      backgroundColor: 'rgb(75, 192, 192)',
    },
    {
      label: 'TxRxSum',
      data: txRxSumData,
      borderColor: '#FF6801',
      backgroundColor: '#E64E00',
      type: 'line',
    },
  ],
};

export default function LiveTrafficChart() {
  return (
    <div className='LiveTrafficChart'>
      <Bar
        options={options} 
        data={data}
      />
    </div>
  );
}
