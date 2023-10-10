import React, { useCallback, useMemo } from 'react'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '../ui/alert-dialog'
import { useAddressModal } from '@/Hooks/useAddressBookModal'
import { useForm } from '@inertiajs/inertia-react';
import { toast } from 'react-toastify';

const DeleteAddressModal = () => {

    const {isOpen,type,onClose,data:address} = useAddressModal();

    const OPEN = useMemo(()=>isOpen&&type==='DeleteAddress',[isOpen,type])
    const { post,processing } = useForm();

    const onDelete = useCallback(()=>{
        if(!address?.id) return;

        post(route('addresses.destroy',{
            id:address.id
        }),{
            
            onSuccess:()=>{
                toast.success('Address Deleted!')
                onClose();
            },
            onError:()=>toast.error('Internal Error. Please Try again!'),
            preserveScroll:true,
            preserveState:true,
        })

    },[post,address?.id]);

    if(!address) return null;

    return (
        <AlertDialog open={OPEN} onOpenChange={onClose}>
            <AlertDialogContent>
                <AlertDialogHeader>
                <AlertDialogTitle>{`Delete ${address.email}`}</AlertDialogTitle>
                <AlertDialogDescription>
                    This can not be undone. Address will be deleted...
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

export default DeleteAddressModal