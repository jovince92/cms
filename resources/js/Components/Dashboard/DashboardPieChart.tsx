import { FC } from 'react'

import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import ActionTooltip from '../ActionTooltip';

type ChartParams = {
    cx:number; 
    cy:number; 
    midAngle:number; 
    innerRadius:number; 
    outerRadius:number; 
    percent:number; 
    index?:number;
}

const data = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
];

const COLORS = ['#2563eb', '#e11d48', '#6366f1', '#ec4899'];

const RADIAN = Math.PI / 180;



const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }:ChartParams) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    const percentage=`${(percent * 100).toFixed(0)}%`;
    return (
        
            <text
                x={x}
                y={y}
                fill="white"
                textAnchor={x > cx ? "start" : "end"}
                dominantBaseline="central"
                >
            {percentage}
            </text>
        
    );
};

const DashboardPieChart:FC = () => {
    return (

        <div className='w-full'>
            <PieChart width={640} height={640}>
                <Pie
                    data={data}
                    cx={200}
                    cy={200}
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={160}
                    fill="#8884d8"
                    dataKey="value"
                >
                    {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
            </PieChart>
        </div>
    )
}

export default DashboardPieChart