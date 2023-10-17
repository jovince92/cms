import { useAccountModal } from '@/Hooks/useAccountModal'
import React, { FC,  FormEventHandler, useEffect, useMemo } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { useForm } from '@inertiajs/inertia-react';
import { Button } from '../ui/button';
import { toast } from 'react-toastify';

const NewUserModal:FC = () => {
    const {isOpen,type,data:ModalData,onClose} = useAccountModal();
    const {post,processing,data,setData,reset,errors} = useForm({
        id:0,
        name:"",
        company_id:"",
    });
    const OPEN = useMemo(()=>isOpen&&type==='StoreAccount',[isOpen,type]);

    const onSubmit:FormEventHandler<HTMLFormElement> =  (e) =>{
        e.preventDefault();
        const url = !ModalData?.id?route('accounts.store'):route('accounts.update')
        post(url,{
            onSuccess:()=>{
                toast.info( !ModalData?.id? 'Account Created':'Account Updated');
                onClose();
            },
            onError:()=>toast.error('Something Went Wrong. Please try again...')
        })
    }

    useEffect(()=>{
        if(!isOpen) return reset();
        if(!ModalData) return;
        setData(val=>({
            ...val,
            id:ModalData.id,
            name:ModalData.name,
            company_id:ModalData.company_id
        }));
    },[isOpen,ModalData]);

    return (
        <Dialog open={OPEN} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Account Manager</DialogTitle>
                    <DialogDescription  >
                        {!ModalData?.company_id? `Default Password is 'password'`:`Update Account '${ModalData.company_id}'`}
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={onSubmit} className='flex flex-col space-y-2.5'>
                    <div className='flex flex-col space-y-1'>
                        <Label htmlFor='name'>Name</Label>
                        <Input autoComplete='off' autoFocus required disabled={processing} id='name' value={data.name} onChange={({target})=>setData('name',target.value)} />
                        {errors.name&& <p className='text-destructive text-xs'>{errors.name}</p>}
                    </div>
                    <div className='flex flex-col space-y-1'>
                        <Label htmlFor='name'>Company ID</Label>
                        <Input autoComplete='off' required disabled={processing} id='name' value={data.company_id} onChange={({target})=>setData('company_id',target.value)} />
                        {errors.company_id&& <p className='text-destructive text-xs'>{errors.company_id}</p>}
                    </div>
                    <Button disabled={processing} className='ml-auto font-semibold text-base' size='sm' variant='outline'>
                        {!ModalData?.id? 'Create':'Update'}
                    </Button>
                </form>
            </DialogContent>
            
        </Dialog>
    )
}

export default NewUserModal