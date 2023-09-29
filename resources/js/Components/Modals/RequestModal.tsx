import  { FC, useEffect, useMemo, useState } from 'react';
import { Dialog, DialogContent } from '../ui/dialog';

import { useQuotationModal } from '@/Hooks/useQuotationModal';
import { Separator } from '../ui/separator';
import { Button } from '../ui/button';

import TipTap from '../TipTap/TipTap';

const RequestModal:FC = () => {
    
    const {isOpen,type,onClose,emailMsg} = useQuotationModal();
    const OPEN = useMemo(()=>isOpen&&type==='RequestQuotation',[isOpen,type]);

    const onSubmit = () =>{
    }

    

    if(!emailMsg){
        return null;
    }

    return (
        <Dialog open={OPEN} onOpenChange={onClose}>
            <DialogContent className='max-w-[90vw] max-h-[95vh] h-full flex flex-col space-x-1.5'>
                <div className='w-full'>
                    <p className='font-semibold text-lg'>Send Request Email</p>
                    <Separator />
                </div>
                <div className='w-full flex-1 flex flex-col max-h-fit overflow-y-auto'>
                    <TipTap content={emailMsg} />
                </div>
                <div className='flex items-center justify-end space-x-1.5'>
                    <Button variant='secondary' size='sm' className='text-base'>Close</Button>
                    <Button onClick={onSubmit} variant='outline' size='sm' className='text-base'>Submit</Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default RequestModal;


