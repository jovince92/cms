import DashboardPieChart from '@/Components/Dashboard/DashboardPieChart'
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card'
import Layout from '@/Layout/Layout'
import React, { FC } from 'react'

const Dashboard:FC = () => {
    return (
        <Layout label='Dashboard'>
            <div className='h-full flex flex-col space-y-2.5 overflow-y-hidden'>
                <div className='flex flex-col space-y-1.5 md:flex-row md:space-y-0 md:space-x-1.5 '>
                    <DashboardPieChart />
                </div>
            </div>
        </Layout>
    )
}

export default Dashboard

