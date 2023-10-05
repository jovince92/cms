import PhaseAccordion from '@/Components/Phase/PhaseAccordion';
import ProjectSelector from '@/Components/ProjectSelector';
import { Phase, Project } from '@/Components/types';
import { Button } from '@/Components/ui/button';
import { usePhaseModal } from '@/Hooks/usePhaseModal';
import Layout from '@/Layout/Layout';
import { useForm } from '@inertiajs/inertia-react';
import { PlusCircle } from 'lucide-react';
import {FC, useEffect} from 'react'


type Props={
    selected_project?:Project & {
        phases:Phase[]
    } ;
}

const Phases:FC<Props> = ({selected_project}) => {
    const {onOpen} = usePhaseModal();
    const { get,processing } = useForm();
    const onSelect = (projectId:string) =>{
        get(route('phases.index',{
            project_id:projectId
        }));
    }

    useEffect(()=>console.log(selected_project),[]);
    return (
        <Layout label='Phases'>
            <div className='h-full flex flex-col space-y-2.5 overflow-y-hidden'>
                <div className='overflow-hidden flex flex-col md:flex-row space-y-1 md:space-y-0 md:justify-between md:items-center'>
                    
                    <Button disabled={!selected_project} onClick={()=>onOpen(selected_project!)} size='sm' variant='outline' className='flex text-base justify-center md:justify-start items-center'>
                        <PlusCircle className='mr-2 h-5 w-5' />
                        <span>Add Phase</span>
                    </Button>
                    <ProjectSelector className='ml-auto' onSelect={onSelect} selectedProjectId={selected_project?.id.toString()} />
                </div>
                <div className='flex-1 overflow-auto flex flex-col relative'>
                    {!selected_project?<p className='text-3xl font-bold text-center w-full my-3.5'>Select a Project</p>:<PhaseAccordion phases={selected_project.phases} />}
                    
                    
                </div>
            </div>
        </Layout>
    )
}

export default Phases