import { FC } from 'react'

import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import ActionTooltip from '../ActionTooltip';
import { cn } from '@/lib/utils';

type ChartParams = {
    cx:number; 
    cy:number; 
    midAngle:number; 
    innerRadius:number; 
    outerRadius:number; 
    percent:number; 
    index?:number;
}

//"Done"|"Ongoing"|"On-hold"|"Cancelled"|"Not Started"|"Planning"

const data = [
    { name: 'Done', value: 400 },
    { name: 'Ongoing', value: 300 },
    { name: 'On-hold', value: 300 },
    { name: 'Cancelled', value: 200 },
    { name: 'Not Started', value: 150 },
    { name: 'Planning', value: 300 },
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

const DashboardPieChart:FC<{className?:string}> = ({className}) => {
    return (
        
        <div className={cn('flex items-center justify-center space-x-3.5',className)}>
            <PieChart width={320} height={320}>
                <Pie
                    data={data}
                    // cx={200}
                    // cy={200}
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
            <div className='flex flex-col space-y-2.5 h-full'>
                <p className='font-bold tracking-tight'>Project Status Breakdown</p>
                <div className='h-full flex flex-col space-x-5'>

                </div>
            </div>
            
        </div>
    )
}

export default DashboardPieChart