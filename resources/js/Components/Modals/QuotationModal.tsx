import  { ChangeEventHandler, FC, FormEventHandler, useEffect, useMemo, useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,  } from '../ui/dialog'
import { Separator } from '../ui/separator';
import { Input } from '../ui/input'
import { format } from 'date-fns'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { ModeOfPayments } from '@/lib/utils';
import { Button } from '../ui/button';
import { useQuotationModal } from '@/Hooks/useQuotationModal';
import { ModeofPayment } from '../types';
import { Badge } from '../ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { HardDriveUpload, Loader2, Trash2 } from 'lucide-react';
import { toast } from 'react-toastify';
import AddQuotationItem from './QuotationModalComponents/AddQuotationItem';
import QuotationList from './QuotationModalComponents/QuotationList';
import { useForm, } from '@inertiajs/inertia-react';

export type ItemType={    
    name:string;
    description:string;
    supplier:string;
    estimated_delivery_date:string;
    price:number;
    qty:number;
    mode_of_payment:ModeofPayment;
}

export type QuotationType={
    project_id:number;
    requisition_number:string;
    quotation_id:number;
}

const QuotationModal:FC = () => {
    const {isOpen,type,onClose,data} = useQuotationModal();
    const { data:FormData,setData, post,processing,reset} = useForm<QuotationType & {items:ItemType[]}>({
        project_id:0,
        requisition_number:"",
        quotation_id:0,
        items:[]
    });
    const OPEN=useMemo(()=>isOpen&&type==='StoreQuotation',[isOpen,type]);
    const itemCount = useMemo(()=>FormData.items?FormData.items.length:0,[FormData.items]);
    const newGrandTotal:number = useMemo(()=>{
        const {items}=FormData;
        if(!items) return 0;
        return items.reduce((total,{price,qty})=>(price*qty)+total,0);
    },[FormData?.items])
    
    const onAdd = (item:ItemType) =>{
        const {items} = FormData;
        if (items.findIndex(({name})=>name===item.name)>-1){
            return toast.error('Item Already Exist!');
        }
        setData(val=>({
            ...val,
            items:[item,...val.items]
        }))
    }
    
    
    useEffect(()=>{
        if(!OPEN) {
            return reset();
        };
        if(!data?.project) return;
        const {project} = data;
        setData(val=>({
            ...val,
            requisition_number:data?.quotation?.requisition_number||`${project.id.toString()}-${format(new Date,'yyyyMMdd').toString()}-${data.itemsCount?data.itemsCount?.toString():'1'}`,
            quotation_id: data?.quotation?.id||0,
            items:data?.quotation?.items||[]
        }));

        

    },[OPEN]);
    
    
    
    if(!data?.project){
        return null;
    }
    const onSubmit = () =>{
        if(!data?.project) return null;
        const apiUrl = data?.quotation?
            route('quotations.update',{project_id:data.project.id}):
            route('quotations.store',{project_id:data.project.id});
        
            
        
        post(apiUrl,{
            onSuccess:()=>{
                const successMsg=data?.quotation?'Quotation Updated':'Quotation Added. Waiting For Approval';
                toast.success(successMsg);
                onClose();
            },
            onError:()=>toast.error('Server Error. Please try again.')
        })
    }
    
    return (
        <Dialog open={OPEN} onOpenChange={onClose} >
            <DialogContent className='max-w-[90vw]'>
                <DialogHeader>
                    <DialogTitle>Add Quotation</DialogTitle>
                    <DialogDescription>
                        New Quotation for {data.project.name}
                    </DialogDescription>
                </DialogHeader>
                <div className='max-h-[75vh]  flex flex-col space-y-1 relative justify-between'>
                    <div className='flex flex-col space-y-1.5 sticky top-0'>
                        <Separator/>
                        <div>
                            <Label>Project:</Label>
                            <Input value={data.project.name} className='text-sm bg-muted cursor-default' readOnly />
                        </div>
                        <div>
                            <Label>Requisition Number:</Label>
                            <Input value={FormData.requisition_number} className='text-sm bg-muted cursor-default' readOnly />
                        </div>
                        <Separator/>
                    </div>
                    <div className='flex-1 overflow-auto'>
                        <Tabs defaultValue="add" className="w-full relative ">
                            <TabsList className='sticky top-0 z-50 w-full rounded-none'>
                                <TabsTrigger value="add">Add Items</TabsTrigger>
                                <TabsTrigger value="list">Item List&nbsp;<Badge variant='default'>{itemCount}</Badge></TabsTrigger>
                            </TabsList>
                            <TabsContent value="add">
                                <AddQuotationItem onAdd={onAdd} />
                            </TabsContent>
                            <TabsContent value="list">
                                <QuotationList items={FormData.items||[]} onDelete={(name)=>setData(val=>({...val,items:val.items.filter(item=>item.name!==name)}))} />
                            </TabsContent>
                                
                        </Tabs>
                    </div>
                </div>
            <DialogFooter >
                <div className='flex flex-col gap-1.5 w-full'>
                        
                    <Separator />
                    <div className='flex items-center'>
                        <div className='flex-1 flex items-center justify-center'>
                            <p>New Grand Total: <span className='font-semibold'>{new Intl.NumberFormat().format(newGrandTotal)}</span> </p>
                        </div>
                        <Button onClick={onSubmit} disabled={processing||FormData.items?.length<1} size='sm' className='ml-auto text-base flex items-center justify-end space-x-2.5'>
                            {
                                !processing?<HardDriveUpload className='h-4 w-4' />:<Loader2 className='animate-spin h-4 w-4' />
                            }
                            <span>Submit</span>
                        </Button>
                    </div>
                    
                </div>
            </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default QuotationModal;




