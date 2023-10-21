import DashboardCardContainer from '@/Components/Dashboard/DashboardCardContainer'
import DashboardMostExpensive from '@/Components/Dashboard/DashboardMostExpensive'
import DashboardPieChart from '@/Components/Dashboard/DashboardPieChart'
import { Project, ProjectStatusType, Quotation } from '@/Components/types'
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card'
import Layout from '@/Layout/Layout'
import React, { FC, useEffect, useMemo } from 'react'

interface DashboardProps{
    projects:Project[];
    pie_chart_data:PieChartData[];
    most_recent:Project;
    approved_quotes:Quotation[]
}

export type PieChartData ={
    status:ProjectStatusType;
    value:number;
}

const Dashboard:FC<DashboardProps> = ({projects,pie_chart_data,most_recent,approved_quotes}) => {

    const mostExpensive = useMemo(()=>projects.filter((project)=>project.actual_cost>0).slice(0,10),[projects]);

    return (
        <Layout label='Dashboard'>
            <div className='h-full flex flex-col space-y-2.5 overflow-y-auto'>
                <DashboardCardContainer projects={projects} mostRecent={most_recent} approvedQuotes={approved_quotes} />
                <div className='flex flex-col space-y-1.5 lg:flex-row lg:space-y-0 lg:space-x-3.5 lg:justify-between lg:items-center lg:h-96'>
                    <DashboardPieChart data={pie_chart_data} className='w-full lg:w-1/2 h-full' />
                    <DashboardMostExpensive mostExpensive={mostExpensive.map(({name,actual_cost,id},_idx)=>({rank:_idx+1,name,amount:actual_cost,id}))} className='w-full lg:w-1/2' />
                </div>
            </div>
        </Layout>
    )
}

export default Dashboard

