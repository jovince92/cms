import React, { FC, FormEventHandler, MouseEventHandler, useState } from 'react'
import { Phase } from '../types'
import ActionTooltip from '../ActionTooltip';
import { Ban, CheckSquare, FileEdit, Loader2, Trash2 } from 'lucide-react';
import { useForm } from '@inertiajs/inertia-react';
import { Input } from '../ui/input';
import { toast } from 'react-toastify';
import { useDeletePhaseModal } from '@/Hooks/useDeletePhaseModal';

interface Props{
    phase:Phase;
}

const PhaseAccordionTrigger:FC<Props> = ({phase}) => {
    const [isEditing,setIsEditing] = useState(false);
    const {setData,processing,post,data} = useForm({name:phase.name,phase_id:phase.id});
    const {onOpen} = useDeletePhaseModal();
    const onSubmit:FormEventHandler<HTMLFormElement> = (e) =>{
        e.preventDefault();
        post(route('phases.update',{
            project_id:phase.project_id
        }),{
            onSuccess:()=>{
                toast.success('Updated!');
                setIsEditing(false);
            },
            onError:()=>toast.error('Something Went Wrong. Please try again!')
        })
    }

    const edit:MouseEventHandler<HTMLAnchorElement> =(e) =>{
        e.stopPropagation();
        setIsEditing(true);
    }

    const cancelEdit:MouseEventHandler<HTMLButtonElement> =(e) =>{
        e.stopPropagation();
        setIsEditing(false);
    }

    const onDelete:MouseEventHandler<HTMLAnchorElement> =(e) =>{
        e.stopPropagation();
        onOpen(phase);
    }

    return (
        <div className='flex items-center space-x-2.5'>
            {
                !isEditing?(
                    <>
                        <p className='font-semibold'>{phase.name}</p>
                        <ActionTooltip label='Edit Phase'>
                            <a href='#' onClick={edit} className='p-1 aspect-square border rounded border-blue-500 dark:border-blue-400 text-blue-500 dark:text-blue-400 opacity-25 hover:opacity-100 transition duration-300' >
                                <FileEdit className='h-4 w-4' />
                            </a>
                        </ActionTooltip>
                        <ActionTooltip label='Delete Phase'>
                            <a href='#' onClick={onDelete} className='p-1 aspect-square border rounded border-rose-500 dark:border-rose-400 text-rose-500 dark:text-rose-400 opacity-25 hover:opacity-100 transition duration-300' >
                                <Trash2 className='h-4 w-4' />
                            </a>
                        </ActionTooltip>
                    </>
                ):(
                    <form onSubmit={onSubmit} className='flex items-center space-x-1.5'>
                        <Input autoFocus disabled={processing} value={data.name} onChange={({target})=>setData('name',target.value)} autoComplete='off' required />
                        <ActionTooltip label='Cancel Edit'>
                            <button type='button' onClick={cancelEdit} disabled={processing} className='disabled:opacity-70 p-1 aspect-square border rounded border-red-500 dark:border-red-400 text-red-500 dark:text-red-400'  >
                                <Ban className='h-4 w-4' />
                            </button>
                        </ActionTooltip>
                        <ActionTooltip label='Update'>
                            <button type='submit' onClick={(e)=>e.stopPropagation()} disabled={processing} className='disabled:opacity-70 p-1 aspect-square border rounded border-green-500 dark:border-green-400 text-green-500 dark:text-green-400'  >
                                {!processing?<CheckSquare className='h-4 w-4' />:<Loader2 className='h-4 w-4 animate-spin' /> }
                            </button>
                        </ActionTooltip>
                    </form>
                )
            }
            
        </div>  
    )
}

export default PhaseAccordionTrigger