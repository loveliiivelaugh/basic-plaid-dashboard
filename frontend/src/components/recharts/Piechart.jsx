import React from 'react';
import { PieChart, Pie, ResponsiveContainer } from 'recharts';

// const exampleFormat = [
//   { name: 'Group A', value: 400 },
//   { name: 'Group B', value: 300 },
//   { name: 'Group C', value: 300 },
//   { name: 'Group D', value: 200 },
// ];

const Piechart = ({ data }) => (
  <PieChart width={400} height={250}>
  {console.log(data)}
    <Pie data={data} dataKey="value" cx="50%" cy="50%" outerRadius={60} fill="#8884d8" />
    <Pie data={data} dataKey="value" cx="50%" cy="50%" innerRadius={70} outerRadius={90} fill="#82ca9d" label />
  </PieChart>
);

export default Piechart;
