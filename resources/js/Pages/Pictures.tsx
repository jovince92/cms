import { Project } from '@/Components/types'
import { Button } from '@/Components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/Components/ui/popover'
import Layout from '@/Layout/Layout'
import { cn } from '@/lib/utils'
import { useForm } from '@inertiajs/inertia-react'
import { Check, ChevronsUpDown, PlusCircle } from 'lucide-react'
import React, { FC, useState } from 'react'

interface PictureProps{
    projects:Project[];
    selected_project?:Project
}

const Pictures:FC<PictureProps> = ({projects,selected_project}) => {
    const { get } = useForm();

    const onSelect = (projectId:string) =>{

    }

    const [open,setOpen] = useState(false);
    return (
        <Layout label='Pictures'>
            <div className='h-full flex flex-col space-y-2.5 overflow-y-hidden'>
                <div className='overflow-hidden flex flex-col md:flex-row space-y-1 md:space-y-0 md:justify-start md:items-center'>
                    
                </div>
                <div className='flex-1 overflow-auto flex relative'>
                    
                </div>
                <div className='h-auto'>
                    
                </div>
            </div>
        </Layout>
    )
}

export default Pictures