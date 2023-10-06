import {FC, FormEventHandler, useState} from 'react'
import { Phase } from '../types';
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '../ui/table';
import { Button } from '../ui/button';
import { Ban, PlusCircle, PlusSquare } from 'lucide-react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import DatePicker from '../DatePicker';
import { useForm } from '@inertiajs/inertia-react';

interface PhaseAccordionContentProps{
    phase:Phase;
}

type FormStage = {
    name:string;
    start:string;
    end:string;
}

const PhaseAccordionContent:FC<PhaseAccordionContentProps> = ({phase}) => {
    const {stages} = phase;
    const [adding,setAdding] = useState(false);
    const onSubmit:FormEventHandler<HTMLFormElement> = (e) =>{
        e.preventDefault();
    }

    const {post,data,setData,processing,reset} = useForm<FormStage>({
        name:"",
        start: "",
        end: ""
    });

    const handleClose = () =>{
        setAdding(false);
        reset();
    }

    return (
        <div>
            <Table>
                
                <TableHeader>
                    <TableRow>
                        <TableHead className='min-w-[10rem]'>Stage</TableHead>
                        <TableHead className='min-w-[5rem]'>No. of Days</TableHead>
                        <TableHead className='min-w-[10rem]'>Start Date</TableHead>
                        <TableHead className='min-w-[10rem]'>End Date</TableHead>
                        <TableHead className='text-right'>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell className="font-medium" >INV001</TableCell>
                        <TableCell>Paid</TableCell>
                        <TableCell>Credit Card</TableCell>
                        <TableCell>$250.00</TableCell>
                        <TableCell className='text-right'>$250.00</TableCell>
                    </TableRow>
                    
                </TableBody>
                <TableCaption className='pb-3.5'>
                    {
                        !adding&&(
                            <Button onClick={()=>setAdding(true)} className='flex items-center justify-center space-x-1.5' variant='secondary' size='sm'>
                                <PlusCircle className='h-4 w-4' />
                                <span>Add Stage</span>
                            </Button>
                        )
                    }
                </TableCaption>
            </Table>
            {
                adding&&(
                    <form onSubmit={onSubmit} className='flex flex-col space-y-1.5 space-x-0 md:flex-row md:space-y-0 md:space-x-1.5 md:justify-center'>
                        <div className='flex flex-col space-y-1 md:flex-1'>
                            <Label htmlFor='stage'>Stage</Label>
                            <Input id='stage' placeholder='Stage 1' />
                        </div>
                        <div className='flex flex-col space-y-1'>
                            <Label>Start Date</Label>
                            <DatePicker date={data.start} setDate={(val)=>setData('start',val||"")} />
                        </div>
                        <div className='flex flex-col space-y-1'>
                            <Label>End Date</Label>
                            <DatePicker disabled={data.start===""} date={data.end} setDate={(val)=>setData('end',val||"")} />
                        </div>
                        <div className='flex items-center justify-end md:items-end  space-x-1.5  md:flex-1'>
                            <Button onClick={handleClose} type='button' variant='secondary' size='sm' className='text-base'>Cancel</Button>
                            <Button type='submit' variant='outline' size='sm' className='text-base'>Submit</Button>
                        </div>
                    </form>
                )
            }
        </div>
    )
}

export default PhaseAccordionContent