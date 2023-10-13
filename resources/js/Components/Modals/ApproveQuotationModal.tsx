import { useQuotationModal } from '@/Hooks/useQuotationModal';
import { useForm } from '@inertiajs/inertia-react';
import {FC, useCallback, useMemo} from 'react'
import { toast } from 'react-toastify';
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '../ui/alert-dialog';
import { Button } from '../ui/button';

const ApproveQuotationModal:FC = () => {
    const {isOpen,type,onClose,data} = useQuotationModal();
    const OPEN = useMemo(()=>isOpen&&type==='ApproveQuotation',[isOpen,type]);

    const { post,processing } = useForm();

    const onDelete = useCallback(()=>{
        if(!data?.quotation?.id) return null;
        if(!data?.quotation?.project_id) return null;
        
        // post(route('quotations.destroy',{
        //     project_id:data.quotation.project_id,
        //     id:data.quotation.id
        // }),{
            
        //     onSuccess:()=>{
        //         toast.success('Quotation Approved!')
        //         onClose();
        //     },
        //     onError:()=>toast.error('Internal Error. Please Try again!'),
        //     preserveScroll:true,
        //     preserveState:true,
        // });

    },[post,data?.quotation?.id,data?.quotation?.project_id]);

    if(!data?.quotation) return null;
    return (
        <AlertDialog open={OPEN} onOpenChange={onClose}>
            <AlertDialogContent>
                <AlertDialogHeader>
                <AlertDialogTitle>{`Approve ${data.quotation.requisition_number}`}</AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <Button variant='secondary' onClick={onClose} disabled={processing}>Close</Button>
                    <Button variant='outline' onClick={onDelete} disabled={processing}>Approve</Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default ApproveQuotationModal