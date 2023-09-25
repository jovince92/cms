import { useImageModal } from '@/Hooks/useImageModal'
import {FC, useCallback, useMemo} from 'react'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '../ui/alert-dialog';
import { useForm } from '@inertiajs/inertia-react';
import { toast } from 'react-toastify';
import { Button } from '../ui/button';

const DeletePictureModal:FC = () => {

    const {type,data,isOpen,onClose} = useImageModal();

    const OPEN=useMemo(()=>isOpen&&type==='DeleteImage',[isOpen,type]);
    const { post,processing } = useForm();

    const onDelete = useCallback(()=>{
        if(!data?.picture?.id) return;

        post(route('pictures.destroy',{
            id:data.picture.id,
            project_id:data.picture.project_id
        }),{
            onSuccess:()=>{
                toast.success('Image Deleted!');
                onClose();
            },
            onError:()=>toast.error('Internal Error. Please Try again!'),
            preserveScroll:true,
            preserveState:true,
        })

    },[post,data?.picture?.id]);

    if(!data?.picture){
        return null;
    }

    return (
        <AlertDialog open={OPEN} onOpenChange={onClose}>
            <AlertDialogContent>
                <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                    This can not be undone. Image will be deleted...
                </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <Button className='text-base font-semibold' variant='outline' onClick={onClose} disabled={processing}>Cancel</Button>
                    <Button className='text-base font-semibold' onClick={onDelete} disabled={processing}>Continue</Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default DeletePictureModal