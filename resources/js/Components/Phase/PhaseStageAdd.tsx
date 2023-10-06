import {FC, FormEventHandler, useState} from 'react';
import { Stage } from '../types';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import DatePicker from '../DatePicker';
import { Button } from '../ui/button';
import { FormStage } from './PhaseAccordionContent';
import { ta } from 'date-fns/locale';

interface PhaseStageAddProps{
    stage?:Stage;
    onClose:()=>void;
    onSubmit:(stage:FormStage)=>void;
    loading?:boolean;
}

const PhaseStageAdd:FC<PhaseStageAddProps> = ({stage,onClose,onSubmit,loading}) => {
    const [stageForm,setStageForm] = useState<FormStage>({
        name:stage?.name||"",
        start:stage?.start||"",
        end:stage?.end||""
    });

    
    const handleSubmit:FormEventHandler<HTMLFormElement> = (e) =>{
        e.preventDefault();
        onSubmit(stageForm);
    }

    return (
        <form onSubmit={handleSubmit} className='flex flex-col space-y-1.5 space-x-0 md:flex-row md:space-y-0 md:space-x-1.5 md:justify-center'>
            <div className='flex flex-col space-y-1 md:flex-1'>
                <Label htmlFor='stage'>Stage</Label>
                <Input autoComplete='off' disabled={loading} value={stageForm.name} onChange={({target})=>setStageForm(val=>({...val,name:target.value}))} id='stage' placeholder='Stage 1' />
            </div>
            <div className='flex flex-col space-y-1'>
                <Label>Start Date</Label>
                <DatePicker disabled={loading} date={stageForm.start} setDate={(dt)=>setStageForm(val=>({...val,start:dt||"",}))} />
            </div>
            <div className='flex flex-col space-y-1'>
                <Label>End Date</Label>
                <DatePicker disabled={stageForm.start===""||loading} date={stageForm.end} setDate={(dt)=>setStageForm(val=>({...val,end:dt||"",}))} />
            </div>
            <div className='flex items-center justify-end md:items-end  space-x-1.5  md:flex-1'>
                <Button disabled={loading} onClick={onClose} type='button' variant='secondary' size='sm' className='text-base'>Cancel</Button>
                <Button disabled={loading} type='submit' variant='outline' size='sm' className='text-base'>Submit</Button>
            </div>
        </form>
    )
}

export default PhaseStageAdd