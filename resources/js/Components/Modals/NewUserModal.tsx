import { useAccountModal } from '@/Hooks/useAccountModal'
import React, { FC,  FormEventHandler, useEffect, useMemo } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { useForm } from '@inertiajs/inertia-react';
import { Button } from '../ui/button';

const NewUserModal:FC = () => {
    const {isOpen,type,data:ModalData,onClose} = useAccountModal();
    const {post,processing,data,setData,reset} = useForm({
        id:0,
        name:"",
        company_id:"",
    });
    const OPEN = useMemo(()=>isOpen&&type==='StoreAccount',[isOpen,type]);

    const onSubmit:FormEventHandler<HTMLFormElement> =  (e) =>{
        e.preventDefault();
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
                        Default Password is 'password'
                    </DialogDescription>
                </DialogHeader>
                <form  className='flex flex-col space-y-2.5'>
                    <div>
                        <Label htmlFor='name'>Name</Label>
                        <Input disabled={processing} id='name' value={data.name} onChange={({target})=>setData('name',target.value)} />
                    </div>
                    <div>
                        <Label htmlFor='name'>Company ID</Label>
                        <Input disabled={processing} id='name' value={data.company_id} onChange={({target})=>setData('company_id',target.value)} />
                    </div>
                    <Button disabled={processing} className='font-semibold text-base' size='sm' variant='outline'>
                        Create
                    </Button>
                </form>
            </DialogContent>
            
        </Dialog>
    )
}

export default NewUserModal