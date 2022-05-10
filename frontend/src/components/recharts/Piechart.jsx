import React from 'react';
import { PieChart, Pie } from 'recharts';

const Piechart = ({ pieChartData }) => (
  <PieChart width={400} height={250}>
    <Pie 
      data={pieChartData} 
      dataKey="value" 
      nameKey="name" 
      cx="50%" 
      cy="50%" 
      innerRadius={60} 
      outerRadius={80} 
      fill="#82ca9d" 
      // label="name"
    />
  </PieChart>
);

export default Piechart;
