import React from 'react';
import { PieChart, Pie, ResponsiveContainer } from 'recharts';

// const exampleFormat = [
//   { name: 'Group A', value: 400 },
//   { name: 'Group B', value: 300 },
//   { name: 'Group C', value: 300 },
//   { name: 'Group D', value: 200 },
// ];

const Piechart = ({ data }) => (
  <ResponsiveContainer width="100%" height={250}>
    <PieChart style={{ margin: 'auto' }}>
      <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60} fill="#8884d8" />
      <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={70} outerRadius={90} fill="#82ca9d" label={({ value, name }) => `${value} - ${name}`} />
    </PieChart>
  </ResponsiveContainer>
);

export default Piechart;
