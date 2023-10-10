import { useAddressModal } from '@/Hooks/useAddressBookModal'
import  { ChangeEventHandler, FC, FormEventHandler, useEffect, useMemo } from 'react'
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from '../ui/sheet';
import { useForm } from '@inertiajs/inertia-react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Loader2 } from 'lucide-react';
import { toast } from 'react-toastify';



type EmailForm = {
    id:number;
    first_name:string;
    last_name:string;
    email:string;
}

const NewAddressModal:FC = () => {
    const {isOpen,type,data:ADDRESS,onClose} = useAddressModal();
    const {data,setData,post,processing,reset,errors} = useForm<EmailForm>({
        id:0,
        first_name:"",
        last_name:"",
        email:""
    });

    const OPEN = useMemo(()=> isOpen&&type==='StoreAddress' ,[isOpen,type]);
    useEffect(()=>{
        if(!isOpen) return reset();

        if(ADDRESS){
            const {id,first_name,last_name,email} = ADDRESS;
            setData(val=>({
                ...val,
                id,
                first_name,
                last_name:last_name||"",
                email
            }));
        }

    },[ADDRESS,isOpen]);
    const handleChange:ChangeEventHandler<HTMLInputElement> = ({target}) =>{
        const {id,value} = target as {id:"first_name" | "last_name"  | "email",value:string};
        setData(id,value);
    }
    const onSubmit:FormEventHandler<HTMLFormElement> = (e) =>{
        e.preventDefault();
        const url = !ADDRESS?route('addresses.store'):route('addresses.update');
        const successMsg =`Email ${ADDRESS?.id?'Updated':'Created'}`;
        e.preventDefault();
        post(url,{
            onSuccess:()=>{
                reset();
                onClose();
                toast.success(successMsg)
            },
            onError:()=>toast.error('Internal Error. Please Try again!'),
            preserveScroll:true,
            preserveState:true,
        });
    }

    return (
        <Sheet open={OPEN} onOpenChange={onClose}>
            <SheetContent side='left' className='max-h-screen overflow-y-auto max-w-lg'>
                <SheetHeader>
                    <SheetTitle>
                        {`${!ADDRESS?'New Address':'Update Address'}`}
                    </SheetTitle>
                    <SheetDescription>
                        {`${!ADDRESS?'Complete the Details Below':'Update Address Details'}`}                        
                    </SheetDescription>
                </SheetHeader>
                <form onSubmit={onSubmit} id='form' className='flex flex-col space-y-2.5 '>
                    <div>
                        <Label htmlFor='first_name'>First Name:</Label>
                        <Input autoFocus disabled={processing} required value={data.first_name} onChange={handleChange} id='first_name' autoComplete='off' />
                    </div>
                    <div>
                        <Label htmlFor='last_name'>Last Name:</Label>
                        <Input disabled={processing} value={data.last_name} onChange={handleChange} id='last_name' autoComplete='off' />
                    </div>
                    <div>
                        <Label htmlFor='email'>Email:</Label>
                        <Input type='email' disabled={processing} required value={data.email} onChange={handleChange} id='email' autoComplete='off' />
                        {errors.email&& <p className='text-destructive text-sm italic'>{errors.email}</p> }
                    </div>
                </form>
                
                <SheetFooter className='my-3.5'>
                    <Button disabled={processing} form='form' variant='outline' className='text-base' size='sm' type="submit">
                        {processing?<Loader2 className='w-4 h-4 animate-spin' />:<span>Submit</span>}
                    </Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}

export default NewAddressModal