import {ChangeEventHandler, FC, FormEventHandler, useMemo, useState} from 'react'
import { ItemType } from '../QuotationModal';
import { Label } from '@/Components/ui/label';
import { Input } from '@/Components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { ModeOfPayments } from '@/lib/utils';
import { Button } from '@/Components/ui/button';
import { ModeofPayment } from '@/Components/types';

interface AddQuotationItemProps{
    onAdd:(item:ItemType)=>void;
    loading?:boolean;
}

const AddQuotationItem:FC<AddQuotationItemProps> = ({onAdd,loading}) =>{
    const initialVal:ItemType = {
        name:"",
        description:"",
        supplier:"",
        estimated_delivery_date:"",
        price:0,
        qty:0,
        mode_of_payment:'Cash'
    }
    const [item,setItem] = useState<ItemType>(initialVal);
    
    const handleChange:ChangeEventHandler<HTMLInputElement|HTMLSelectElement> = ({target}) =>{
        const {id,value} = target;
        setItem(val=>({...val,[id]:value}));
    }
    
    const handleAddItem:FormEventHandler<HTMLFormElement> = (e) =>{
        e.preventDefault();
        onAdd(item);
    }
    

    const totalPrice = useMemo(()=>(!item?.qty||!item.price)?0:item.price*item.qty,[item?.price,item?.qty])

    return(
        <form onSubmit={handleAddItem} className='flex flex-col space-y-1.5 p-2.5'>
            <div>
                <Label htmlFor='name'>Item Name</Label>
                <Input disabled={loading} onChange={handleChange} value={item?.name} id='name' required autoComplete='off' autoFocus />
            </div>
            <div>
                <Label htmlFor='description'>Description (optional) </Label>
                <Input disabled={loading} onChange={handleChange} value={item?.description} id='description' autoComplete='off' />
            </div>
            <div>
                <Label htmlFor='supplier'>Supplier</Label>
                <Input disabled={loading} onChange={handleChange} value={item?.supplier} id='supplier' required autoComplete='off' />
            </div>
            <div>
                <Label htmlFor='estimated_delivery_date'>Estimated Delivery Date</Label>
                <Input disabled={loading} onChange={handleChange} value={item?.estimated_delivery_date} id='estimated_delivery_date' required autoComplete='off' type='date' />
            </div>
            <div className='flex w-full space-x-1.5 items-center'>
                <div className='w-1/2'>
                    <Label htmlFor='price'>Price</Label>
                    <Input disabled={loading} onChange={handleChange} value={item?.price} id='price' required autoComplete='off' type='number' />
                </div>
                <div className='w-1/2'>
                    <Label htmlFor='qty'>Quantity</Label>
                    <Input disabled={loading} onChange={handleChange} value={item?.qty} id='qty' required autoComplete='off' type='number' />
                </div>
            </div>
            <div>
                <Label >Total Price</Label>
                <Input disabled={loading} onChange={handleChange} value={totalPrice} readOnly className='bg-muted cursor-default' />
            </div>
            <div>
                <Label>Mode of Payment</Label>
                <Select disabled={loading} onValueChange={(mop:ModeofPayment)=>setItem(val=>({...val,mode_of_payment:mop}))} value={item?.mode_of_payment} required>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select MOP" />
                    </SelectTrigger>
                    <SelectContent>
                        {ModeOfPayments.map((mop)=><SelectItem key={mop} value={mop}>{mop}</SelectItem>)}
                    </SelectContent>
                </Select>
            </div>
            
            <div className='py-2.5 flex items-center justify-end space-x-2'>
                <Button disabled={loading} onClick={()=>setItem(initialVal)} size='sm' type='button' variant='secondary' className='text-base '>Reset</Button>
                <Button disabled={loading} size='sm' type='submit' variant='outline' className='text-base '>Add Item</Button>
            </div>
        </form>
    );
}

export default AddQuotationItem