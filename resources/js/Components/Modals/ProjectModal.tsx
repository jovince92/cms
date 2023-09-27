import {ChangeEventHandler, FC, FormEventHandler, useEffect, useMemo} from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useProjectModal } from '@/Hooks/useProjectModal';
import { useForm } from '@inertiajs/inertia-react';
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from '../ui/sheet';
import { Separator } from '../ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { ProjectStatus } from '../ProjectStatus';
import { Textarea } from '../ui/textarea';
import { ProjectStatusType } from '../types';
import { toast } from 'react-toastify';

type ProjectData = {
    id?:number;
    name:string;
    description:string;
    location:string,
    manpower:number;
    in_house:number,
    third_party:number;
    total_actual_cost:number;
    date_started:string;
    target_date:string;
    status: ProjectStatusType;
    completion_date?:string;
    remarks:string;
}

const ProjectModal:FC = () => {
    const {isOpen,data:project,onClose,type} = useProjectModal();
    const { post,data,setData,processing,errors,reset } = useForm<ProjectData>({
        id:undefined,
        name:"",
        description:"",
        location:"",
        manpower:0,
        in_house:0,
        third_party:0,
        total_actual_cost:0,
        date_started:"",
        target_date:"",
        status:'Not Started',
        completion_date:"",
        remarks:"",
    });


    const handleChange:ChangeEventHandler<HTMLInputElement|HTMLTextAreaElement> = ({target}) =>{
        const {id,value}=target;
        //@ts-ignore
        setData(id,value);
    }

    const onSubmit:FormEventHandler<HTMLFormElement> = (e) => {
        const successMsg =`Project ${project?.id?'Updated':'Created'}`;
        const apiRoute = project?.id?route('projects.update'):route('projects.store')
        e.preventDefault();
        post(apiRoute,{
            onSuccess:()=>{
                reset();
                onClose();
                toast.success(successMsg)
            },
            onError:()=>toast.error('Internal Error. Please Try again!'),
            preserveScroll:true,
            preserveState:true,
        })
    }

    useEffect(()=>{
        setData(val=>({
            ...val,
            id:project?.id||undefined,
            name:project?.name||"",
            description:project?.description||"",
            location:project?.location||"",
            manpower:project?.manpower||0,
            in_house:project?.in_house||0,
            third_party:project?.third_party||0,
            date_started:project?.date_started||"",
            target_date:project?.target_date||"",
            status:project?.status||'Not Started',
            completion_date:project?.completion_date||"",
            remarks:project?.remarks||""
        }));
    },[project]);

    const OPEN = useMemo(()=>isOpen&&type==='StoreProject',[isOpen,type]);

    return (
        <Sheet open={OPEN} onOpenChange={onClose}>
            <SheetContent side='left' className='max-h-screen overflow-y-auto max-w-lg'>
                <SheetHeader>
                    <SheetTitle>Project Manager</SheetTitle>
                    <SheetDescription>
                        Fill out the form below
                    </SheetDescription>
                </SheetHeader>
                <Separator />
                <form onSubmit={onSubmit} id='form' className='flex flex-col space-y-2.5 '>
                    <div>
                        <Label htmlFor='name'>Name:</Label>
                        <Input autoFocus disabled={processing} required value={data.name} onChange={handleChange} id='name' autoComplete='off' />
                    </div>
                    <div>
                        <Label htmlFor='description'>Description:</Label>
                        <Input disabled={processing} required value={data.description} onChange={handleChange} id='description' autoComplete='off' />
                    </div>
                    <div>
                        <Label htmlFor='location'>Location:</Label>
                        <Input disabled={processing} required value={data.location} onChange={handleChange} id='location' autoComplete='off' />
                    </div>
                    <div>
                        <Label htmlFor='manpower'>Man Power:</Label>
                        <Input disabled={processing} required value={data.manpower} type='number' onChange={handleChange} id='manpower' autoComplete='off' />
                    </div>
                    <div className='grid grid-cols-2 gap-2.5'>
                        <p className='col-span-2'>Quotation:</p>
                        <Separator className='col-span-2'/>
                        <div className='col-span-1'>
                            <Label htmlFor='in_house'>In-House:</Label>
                            <Input disabled={processing} required value={data.in_house} type='number' onChange={handleChange} id='in_house' autoComplete='off' />
                        </div>
                        <div className='col-span-1'>
                            <Label htmlFor='third_party'>3rd Party:</Label>
                            <Input disabled={processing} required value={data.third_party} type='number' onChange={handleChange} id='third_party' autoComplete='off' />
                        </div>
                    </div>
                    <div>
                        <Label htmlFor='date_started'>Planned Start Date:</Label>
                        <Input disabled={processing} required value={data.date_started} type='date' onChange={handleChange} id='date_started' autoComplete='off' />
                    </div>
                    <div>
                        <Label htmlFor='target_date'>Target Date:</Label>
                        {/* <DatePicker  date={data.date_started} setDate={(e)=>setData('date_started',e||"")} /> */}
                        <Input disabled={processing} required value={data.target_date} type='date' onChange={handleChange} id='target_date' autoComplete='off' />
                    </div>
                    <div>
                        <Label>Status:</Label>
                        <Select disabled={processing} required value={data.status} onValueChange={(val:ProjectStatusType)=>setData('status',val)}>
                            <SelectTrigger >
                                <SelectValue placeholder="Select Status..." />
                            </SelectTrigger>
                            <SelectContent>
                                {ProjectStatus.map(status=><SelectItem key={status} value={status}>{status}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>
                    {
                        data.status==='Done'&&(
                            <div>
                                <Label htmlFor='completion_date'>Completion Date:</Label>
                                <Input disabled={processing} required value={data.completion_date} type='date' onChange={handleChange} id='completion_date' autoComplete='off' />
                            </div>
                        )
                    }
                    <div>
                        <Label htmlFor='remarks'>Remarks:</Label>
                        <Textarea disabled={processing} id='remarks' value={data.remarks} onChange={handleChange} />
                    </div>
                </form>
                <SheetFooter className='my-3.5'>
                    <Button disabled={processing} form='form' className='text-base' size='sm' type="submit">Submit</Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}

export default ProjectModal