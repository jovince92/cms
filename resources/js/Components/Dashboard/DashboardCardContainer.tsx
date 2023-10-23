import {FC, useEffect} from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Project, Quotation } from '../types'
import { BellPlus, Box, CheckCircle, DollarSign } from 'lucide-react';
import { format } from 'date-fns';

interface Props{
    projects:Project[];
    mostRecent:Project;
    approvedQuotes:Quotation[];
}

const DashboardCardContainer:FC<Props> = ({projects,mostRecent,approvedQuotes}) => {



    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className='shadow-md shadow-red-500'>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Total Projects
                    </CardTitle>
                    <Box size={24} className='text-red-500' />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{projects.length}</div>
                    <p className="text-xs text-muted-foreground">
                        Including 'Cancelled' Projects
                    </p>
                </CardContent>
            </Card>
            <Card className='shadow-md shadow-blue-500'>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Most Expensive Project
                    </CardTitle>
                    <DollarSign size={24} className='text-blue-500' />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">Php. {new Intl.NumberFormat().format(projects[0].actual_cost)}</div>
                    <p className="text-xs text-muted-foreground">
                        {projects[0].name}
                    </p>
                </CardContent>
            </Card>
            <Card className='shadow-md shadow-green-600'>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Most Recent Project</CardTitle>
                    <BellPlus size={24} className='text-gray-500' />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{mostRecent.name}</div>
                    <p className="text-xs text-muted-foreground">
                        Added On {format(new Date(mostRecent.created_at),'PP')}
                    </p>
                </CardContent>
            </Card>
            <Card className='shadow-md shadow-purple-500'>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Approved Quotations
                    </CardTitle>
                    <CheckCircle size={24} className='text-purple-500' />
                </CardHeader>
                <CardContent>
                <div className="text-2xl font-bold">{approvedQuotes.length}</div>
                {/* <p className="text-xs text-muted-foreground">
                    +201 since last hour
                </p> */}
                </CardContent>
            </Card>
        </div>
        
    )
}

export default DashboardCardContainer