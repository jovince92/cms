import { FC, useMemo, useState } from 'react'
import { Stage } from '../types'
import { TableCell, TableRow } from '../ui/table';
import { format,differenceInDays } from 'date-fns';
import { Ban, CheckSquare, Edit2, Loader2, Trash2 } from 'lucide-react';
import { Button } from '../ui/button';
import { useForm } from '@inertiajs/inertia-react';
import { Input } from '../ui/input';
import DatePicker from '../DatePicker';
import ActionTooltip from '../ActionTooltip';
import { toast } from 'react-toastify';

interface PhaseStageItemProps{
    stage:Stage;
}

const PhaseStageItem:FC<PhaseStageItemProps> = ({stage}) => {
    const {id,name,start,end}=stage;
    const noOfDays = useMemo(()=>differenceInDays(new Date(end),new Date(start)),[start,end]).toString();
    const [isEditing,setIsEditing] = useState(false);
    const {data,setData,processing,post} = useForm({id,name,start,end});

    const onSubmit = () =>{
        post(route('stages.update'),{
            onError:()=>toast.error('Server Error. Please try again.'),
            onSuccess:()=>{
                toast.success('Stage Updated!');
                setIsEditing(false);
            }
        })
    }   

    return (
        <TableRow >
            {
                !isEditing?(
                    <>
                        <TableCell className="font-medium" >{name}</TableCell>
                        <TableCell>{noOfDays}</TableCell>
                        <TableCell>{format(new Date(start),'PPP')}</TableCell>
                        <TableCell>{format(new Date(end),'PPP')}</TableCell>
                        <TableCell className='flex items-center justify-end space-x-2'>
                            <Button size='sm'  variant='destructive'>
                                <Trash2 className='h-4 w-4' />
                            </Button>
                            <Button onClick={()=>setIsEditing(true)} size='sm'  variant='outline'>
                                <Edit2 className='h-4 w-4' />
                            </Button>
                        </TableCell>
                    </>
                ):(
                    <>
                        <TableCell colSpan={2}>
                            <Input autoFocus disabled={processing} value={data.name} onChange={({target})=>setData('name',target.value)} />
                        </TableCell>
                        <TableCell>
                            <DatePicker disabled={processing} date={data.start} setDate={(val)=>setData('start',val?format(new Date(val),'Y-MM-dd'):"")} />
                        </TableCell>
                        <TableCell>
                            <DatePicker disabled={processing} date={data.end} setDate={(val)=>setData('end',val?format(new Date(val),'Y-MM-dd'):"")} />
                        </TableCell>
                        <TableCell className='flex items-center justify-end space-x-2'>
                            <ActionTooltip label='Cancel Edit'>
                                <Button onClick={()=>setIsEditing(false)} disabled={processing} size='sm'  variant='destructive'>
                                    <Ban className='h-4 w-4' />
                                </Button>
                            </ActionTooltip>
                            <ActionTooltip label='Update'>
                                <Button onClick={onSubmit} disabled={processing} size='sm'  variant='outline'>
                                    {processing?<Loader2 className='h-4 w-4 animate-spin' />: <CheckSquare className='h-4 w-4' />}
                                </Button>
                            </ActionTooltip>
                        </TableCell>
                    </>
                )
            }
            
        </TableRow>
    )
}

export default PhaseStageItem