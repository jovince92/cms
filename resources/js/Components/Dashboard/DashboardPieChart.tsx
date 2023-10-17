import { FC } from 'react'

import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import ActionTooltip from '../ActionTooltip';
import { cn } from '@/lib/utils';
import { PieChartData } from '@/Pages/Dashboard';
import { useForm } from '@inertiajs/inertia-react';

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



const COLORS = ['#2563eb', '#e11d48', '#6366f1', '#ec4899', '#d97706', '#9333ea'];

const RADIAN = Math.PI / 180;



const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }:ChartParams) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    const percentage=`${(percent * 100).toFixed(0)}%`;
    return (
        
            <text
                //className='hover:scale-110 transition'
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

const DashboardPieChart:FC<{className?:string,data:PieChartData[]}> = ({className,data}) => {
    const {get} = useForm();
    const colorValues = data.map(({status,value},_idx)=>({status,value,color:COLORS[_idx]}));

    return (
        
        <div className={cn('flex items-center justify-center space-x-3.5',className)}>
            <ResponsiveContainer>
            <PieChart width={320} height={320}>
                <Pie
                    data={data.map(({status,value})=>({name:status,value}))}
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
            </ResponsiveContainer>
            <div className='flex flex-col space-y-2.5 h-full'>
                <p className='font-bold tracking-tight'>Project Status Breakdown</p>
                <div className='h-full flex flex-col justify-evenly flex-1 '>
                    {colorValues.map(val=> (
                        <button onClick={()=>get(route('projects.index',{status:val.status}))} key={val.status} className='flex items-center justify-between space-x-3.5  opacity-70 hover:opacity-100 transition duration-300 '>
                            <div className={cn(`min-h-[1.5rem] min-w-[2.5rem] text-white p-1.5 rounded text-center`)} style={{ backgroundColor: val.color }} >{val.value}</div>
                            <p>{val.status}</p>
                        </button>
                    ))}
                </div>
            </div>
            
        </div>
    )
}

export default DashboardPieChart