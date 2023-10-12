import Gantt from '@/Components/GanttChart/Gantt';
import GanttChartPanel from '@/Components/GanttChart/GanttChartPanel';
import ProjectSelector from '@/Components/ProjectSelector'
import { Phase, Project } from '@/Components/types';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/Components/ui/select';
import Layout from '@/Layout/Layout'
import { cn } from '@/lib/utils';
import { useForm } from '@inertiajs/inertia-react';
import axios from 'axios';
import { Task } from 'dhtmlx-gantt';
import {FC, useEffect, useState,lazy, useMemo} from 'react'



type Props={
    selected_project?:Project; 
    chart_data:Task[];
}

const GanttChart:FC<Props> = ({selected_project,chart_data}) => {
    const { get,processing } = useForm();
    const [viewMode,setViewMode] = useState<'month'|'year'|'day'|'week'|undefined>();
    const onSelect = (projectId:string) =>{
        const url:any=route('gantt_chart.index',{
            project_id:projectId
        });
        get(url,{
            preserveScroll:false,
            preserveState:false
        });
    }

    return (
        <Layout  label='Gannt Chart'>
            <div className='h-full flex flex-col space-y-2.5 overflow-y-hidden'>
                <div className='overflow-hidden flex flex-col md:flex-row space-y-1 md:space-y-0 md:justify-between md:items-center'>
                    <div>
                        <Select onValueChange={(e:'month'|'year'|'day'|'week')=>setViewMode(e)}>
                            <SelectTrigger >
                                <SelectValue placeholder="Select view mode" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>View Mode</SelectLabel>
                                    <SelectItem value="year">Year</SelectItem>
                                    <SelectItem value="month">Month</SelectItem>
                                    <SelectItem value="day">Day</SelectItem>
                                    <SelectItem value="week">Week</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        { selected_project && <p className='text-lg font-semibold'>{selected_project.name}</p>}
                    </div>
                    <ProjectSelector  onSelect={onSelect} selectedProjectId={selected_project?.id.toString()} />
                </div>
                <div className={cn('flex-1 overflow-auto flex relative w-full gantt-container',processing&&'blur-3xl transition duration-700')}>
                    {!selected_project&&<p className='text-3xl font-bold text-center w-full my-3.5'>Select a Project</p>}
                    {(selected_project)&&<Gantt viewMode={viewMode} phases={ {tasks:chart_data}}   />}
                </div>
            </div>
        </Layout>
    )
}

export default GanttChart