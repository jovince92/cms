import {FC,  useState} from 'react'
import { Phase } from '../types';
import { Table, TableBody, TableCaption,  TableHead, TableHeader, TableRow } from '../ui/table';
import { Button } from '../ui/button';
import {  PlusCircle, } from 'lucide-react';
import { format } from 'date-fns';
import PhaseStageItem from './PhaseStageItem';
import PhaseStageAdd from './PhaseStageAdd';
import { toast } from 'react-toastify';
import { Inertia } from '@inertiajs/inertia';
interface PhaseAccordionContentProps{
    phase:Phase;
}

export type FormStage = {
    name:string;
    start:string;
    end:string;
}

const PhaseAccordionContent:FC<PhaseAccordionContentProps> = ({phase}) => {
    const {stages} = phase;
    const [adding,setAdding] = useState(false);
    const [loading,setLoading] = useState(false);

    

    

    const onSubmit = (stage:FormStage) =>{
        const {name,start,end} = stage;
        const startDt=new Date(start);
        const endDt=new Date(end);
        if(name.length<1) return toast.error('Name is required');
        if(start==="") return toast.error('Start Date is required');
        if(end==="") return toast.error('End Date is required');
        if(endDt<startDt) return toast.error('End Date should not be before Start Date');
        
        

        const url = route('stages.store');
        setLoading(true);
        Inertia.post(url, {
            phase_id:phase.id,
            name,
            start:format(startDt,'Y-MM-dd'),
            end:format(endDt,'Y-MM-dd'),
            
        },{
            onError:()=>toast.error('Server Error. Please try again.'),
            onSuccess:()=>{
                toast.success('Stage Created');
                setAdding(false);
            },
            onFinish:()=>setLoading(false)
        });
        
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
                    {
                        stages.map((stage)=>(
                            <PhaseStageItem stage={stage} key={stage.id}/>
                        ))
                    }
                    
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
                adding&&<PhaseStageAdd loading={loading} onClose={()=>setAdding(false)} onSubmit={onSubmit} />
            }
        </div>
    )
}

export default PhaseAccordionContent