import GanttChartPanel from '@/Components/GanttChart/GanttChartPanel';
import ProjectSelector from '@/Components/ProjectSelector'
import { Phase, Project } from '@/Components/types';
import Layout from '@/Layout/Layout'
import { useForm } from '@inertiajs/inertia-react';
import {FC} from 'react'

type Props={
    selected_project?:Project & {
        phases:Phase[]
    } ;
}

const GanttChart:FC<Props> = ({selected_project}) => {
    const { get,processing } = useForm();
    const onSelect = (projectId:string) =>{
        get(route('gantt_chart.index',{
            project_id:projectId
        }));
    }
    return (
        <Layout  label='Gannt Chart'>
            <div className='h-full flex flex-col space-y-2.5 overflow-y-hidden'>
                <div className='overflow-hidden flex flex-col md:flex-row space-y-1 md:space-y-0 md:justify-between md:items-center'>
                    { selected_project && <p className='text-lg font-semibold'>{selected_project.name}</p>}
                    <ProjectSelector className='ml-auto' onSelect={onSelect} selectedProjectId={selected_project?.id.toString()} />
                </div>
                <div className='flex-1 overflow-auto flex relative'>
                    {!selected_project?
                        <p className='text-3xl font-bold text-center w-full my-3.5'>Select a Project</p>:(
                            <div className='flex-1 h-full overflow-auto'>
                                <GanttChartPanel phases={selected_project.phases} />
                            </div>
                        )}
                </div>
            </div>
        </Layout>
    )
}

export default GanttChart