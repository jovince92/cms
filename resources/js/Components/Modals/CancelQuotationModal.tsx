import { useQuotationModal } from '@/Hooks/useQuotationModal'
import React, { FC, useCallback, useMemo } from 'react'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '../ui/alert-dialog';
import { useForm } from '@inertiajs/inertia-react';
import { toast } from 'react-toastify';
import { Button } from '../ui/button';



const CancelQuotationModal:FC = () => {

    const {isOpen,type,onClose,data} = useQuotationModal();
    const OPEN = useMemo(()=>isOpen&&type==='CancelQuotation',[isOpen,type]);

    const { post,processing } = useForm();

    const onDelete = useCallback(()=>{
        if(!data?.quotation?.id) return null;
        if(!data?.quotation?.project_id) return null;
        
        post(route('quotations.destroy',{
            project_id:data.quotation.project_id,
            id:data.quotation.id
        }),{
            
            onSuccess:()=>{
                toast.info('Quotation Canceled!')
                onClose();
            },
            onError:()=>toast.error('Internal Error. Please Try again!'),
            preserveScroll:true,
            preserveState:true,
        });

    },[post,data?.quotation?.id,data?.quotation?.project_id]);

    if(!data?.quotation) return null;
    return (
        <AlertDialog open={OPEN} onOpenChange={onClose}>
            <AlertDialogContent>
                <AlertDialogHeader>
                <AlertDialogTitle>{`Cancel ${data.quotation.requisition_number}`}</AlertDialogTitle>
                <AlertDialogDescription>
                    Are you sure? This can not be reversed...
                </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <Button variant='secondary' onClick={onClose} disabled={processing}>Close</Button>
                    <Button variant='outline' onClick={onDelete} disabled={processing}>Continue</Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default CancelQuotationModal