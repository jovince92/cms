import Gallery from '@/Components/Picture/Gallery';
import ProjectSelector from '@/Components/ProjectSelector'
import { Project } from '@/Components/types';
import { Button } from '@/Components/ui/button';
import { Separator } from '@/Components/ui/separator';
import { useImageModal } from '@/Hooks/useImageModal';
import Layout from '@/Layout/Layout';
import { useForm } from '@inertiajs/inertia-react'
import { PlusCircle } from 'lucide-react';
import React, { FC, useEffect, useState } from 'react'

interface PictureProps{
    selected_project?:Project
}

const Pictures:FC<PictureProps> = ({selected_project}) => {
    const { get } = useForm();
    const {onOpen} = useImageModal();
    const onSelect = (projectId:string) =>{
        get(route('pictures.index',{
            project_id:projectId
        }));
    }

    return (
        <Layout label='Pictures'>
            <div className='h-full flex flex-col space-y-2.5 overflow-y-hidden'>
                <div className='overflow-hidden flex flex-col md:flex-row space-y-1 md:space-y-0 md:justify-between md:items-center'>
                    {
                        selected_project&&(
                            <Button onClick={()=>onOpen('UploadImage',{project:selected_project})} size='sm' variant='outline' className='flex text-base justify-center md:justify-start items-center'>
                                <PlusCircle className='mr-2 h-5 w-5' />
                                <span>Upload New Image</span>
                            </Button>
                        )
                    }
                    <ProjectSelector className='ml-auto' onSelect={onSelect} selectedProjectId={selected_project?.id.toString()} />
                </div>
                <div className='flex-1 overflow-auto flex flex-col relative'>
                    <p className='text-3xl font-bold text-center w-full my-3.5'>
                        {!selected_project?<span>Select a Project</span>:<span>{selected_project.name}</span>}    
                    </p>
                    <Separator />
                    {(selected_project?.pictures&&selected_project?.pictures?.length<1)&&<p className='text-2xl font-extrabold text-center w-full'>No Pictures Uploaded to this Project...</p>}
                    {selected_project&&<Gallery pictures={selected_project?.pictures} />}
                </div>
            </div>
        </Layout>
    )
}

export default Pictures