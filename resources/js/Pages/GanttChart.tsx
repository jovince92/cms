import Gantt from '@/Components/GanttChart/Gantt';
import GanttChartPanel from '@/Components/GanttChart/GanttChartPanel';
import ProjectSelector from '@/Components/ProjectSelector'
import { Phase, Project } from '@/Components/types';
import Layout from '@/Layout/Layout'
import { useForm } from '@inertiajs/inertia-react';
import axios from 'axios';
import { Task } from 'dhtmlx-gantt';
import {FC, useEffect, useState,lazy, useMemo} from 'react'



type Props={
    selected_project?:Project & {
        phases:Phase[]
    };
    chart_data:Task[];
}

const GanttChart:FC<Props> = ({selected_project,chart_data}) => {
    //const [loading,setLoading] = useState(false);
    const { get,processing } = useForm();
    const onSelect = (projectId:string) =>{
        //setLoading(true);
        const url:any=route('gantt_chart.index',{
            project_id:projectId
        });
        get(url,{
            preserveScroll:false,
            preserveState:false
        });
        // //return window.location.href=url;
        // axios.get(url)
        // .then(({data})=>setPhases(val=>[...data]))
        // .catch((e)=>console.log(e))
        // .finally(()=>setLoading(false));
    }

    const data=({tasks:chart_data});

    useEffect(()=>console.log(chart_data),[]);
    return (
        <Layout  label='Gannt Chart'>
            <div className='h-full flex flex-col space-y-2.5 overflow-y-hidden'>
                <div className='overflow-hidden flex flex-col md:flex-row space-y-1 md:space-y-0 md:justify-between md:items-center'>
                    { selected_project && <p className='text-lg font-semibold'>{selected_project.name}</p>}
                    <ProjectSelector className='ml-auto' onSelect={onSelect} selectedProjectId={selected_project?.id.toString()} />
                </div>
                <div className='flex-1 overflow-auto flex relative w-full gantt-container'>
                    {!selected_project&&<p className='text-3xl font-bold text-center w-full my-3.5'>Select a Project</p>}
                    {(!processing&&selected_project)&&<Gantt phases={ {tasks:chart_data}}   />}
                </div>
            </div>
        </Layout>
    )
}

export default GanttChart