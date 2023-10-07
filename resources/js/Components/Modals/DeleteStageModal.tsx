import { useDeleteStageModal } from '@/Hooks/useDeleteStageModal';
import { Inertia } from '@inertiajs/inertia';
import {FC, useState} from 'react'
import { toast } from 'react-toastify';
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '../ui/alert-dialog';
import { Button } from '../ui/button';

const DeleteStageModal:FC = () => {
    const {isOpen,onClose,stage} = useDeleteStageModal();
    const [loading,setLoading] = useState(false);
    
    const onDelete = () =>{
        if(!stage) return;
        const {id} = stage;
        setLoading(true);
        Inertia.post(route('stages.destroy'), {id},{
            onError:()=>toast.error('Server Error. Please try again.'),
            onSuccess:()=>{
                toast.success('Stage Deleted');
                setLoading(false);
                onClose();
            },
        });
    }


    if(!stage) return null;
    return (
        <AlertDialog open={isOpen} onOpenChange={onClose}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Delete {stage.name}?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Warning. This can not be undone.
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

export default DeleteStageModal