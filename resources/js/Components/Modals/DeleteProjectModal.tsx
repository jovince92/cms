import {FC, useCallback, useMemo} from 'react'
import { Project } from '../types'
import { useForm } from '@inertiajs/inertia-react';
import { toast } from 'react-toastify';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '../ui/alert-dialog';
import { useProjectModal } from '@/Hooks/useProjectModal';


const DeleteProjectModal:FC= () => {
    const {isOpen,data:project,onClose,type} = useProjectModal();
    const { post,processing } = useForm();

    const onDelete = useCallback(()=>{
        if(!project?.id) return;

        post(route('projects.destroy',{
            id:project.id
        }),{
            
            onSuccess:()=>{
                
                toast.success('Project Deleted!')
            },
            onError:()=>toast.error('Internal Error. Please Try again!'),
            preserveScroll:true,
            preserveState:true,
        })

    },[post,project?.id])

    const OPEN = useMemo(()=>isOpen&&type==='DeleteProject',[isOpen,type]);

    if(!project){
        return null;
    }

    return (
        <AlertDialog open={OPEN} onOpenChange={onClose}>
            <AlertDialogContent>
                <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                    This can not be undone. Project will be deleted...
                </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={processing}>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={onDelete} disabled={processing}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default DeleteProjectModal