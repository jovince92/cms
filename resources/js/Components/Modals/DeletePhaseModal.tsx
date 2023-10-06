import React, { useState } from 'react'
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '../ui/alert-dialog'
import { Button } from '../ui/button'
import { useDeletePhaseModal } from '@/Hooks/useDeletePhaseModal'
import { Inertia } from '@inertiajs/inertia'
import { toast } from 'react-toastify'



const DeletePhaseModal = () => {

    const {isOpen,onClose,phase} = useDeletePhaseModal();
    const [loading,setLoading] = useState(false);
    const onDelete = () =>{
        if(!phase) return;
        setLoading(true);
        Inertia.post(route('phases.destroy',{
            project_id:phase.project_id
        }), {
            phase_id:phase.id,
            
        },{
            onError:()=>toast.error('Server Error. Please try again.'),
            onSuccess:()=>{
                toast.success('Phase Deleted');
                setLoading(false);
                onClose();
            },
        });
    }


    if(!phase) return null;
    return (
        <AlertDialog open={isOpen} onOpenChange={onClose}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Delete {phase.name}?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This Phase will be deleted along with its Stages.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <Button size='sm' className='text-base font-semibold' disabled={loading} variant='outline' onClick={onClose} >Cancel</Button>
                    <Button size='sm' className='text-base font-semibold' disabled={loading} onClick={onDelete} >Continue</Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default DeletePhaseModal