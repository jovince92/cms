import React, { FormEventHandler, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { usePhaseModal } from '@/Hooks/usePhaseModal'
import { useForm } from '@inertiajs/inertia-react';
import { Loader2 } from 'lucide-react';
import { toast } from 'react-toastify';

const NewPhaseModal = () => {
    const {isOpen,project,onClose} = usePhaseModal();
    const { post,processing,data,setData,reset } = useForm({
        project_id:0,
        name:"",
        description:""
    });
    const onSubmit:FormEventHandler<HTMLFormElement> = (e) =>{
        if(!project) return null;
        e.preventDefault();
        post(route('phases.store',{
            project_id:project.id
        }),{
            onError:()=>toast.error('Something Went Wrong. Please try Again'),
            onSuccess:()=>{
                toast.success('Phase Created!');
                handleClose();
            }
        })
    }


    const handleClose = () =>{
        onClose();
        reset();
    }

    if(!project){
        return null;
    }

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent >
                <DialogHeader>
                    <DialogTitle>Project: {project.name}</DialogTitle>
                    <DialogDescription>
                        Add New Phase to this Project.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={onSubmit} className="grid gap-4 py-4" id='form'>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Name
                        </Label>
                        <Input
                            id="name"
                            autoComplete='off'
                            className="col-span-3"
                            placeholder='Phase 1'
                            value={data.name}
                            required
                            onChange={(({target})=>setData('name',target.value))}
                            disabled={processing} 
                            />
                    </div>
                    {/* <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="description" className="text-right">
                            Description <span className='text-muted-foreground italic'>(optional)</span>
                        </Label>
                        <Input
                            id="description"
                            autoComplete='off'
                            className="col-span-3"
                            value={data.description}
                            onChange={(({target})=>setData('description',target.value))}
                            disabled={processing} 
                            />
                    </div> */}
                </form>
                <DialogFooter>
                    <Button disabled={processing} variant='outline' type="submit" form='form' size='sm' className='text-sm font-semibold flex items-center space-x-1.5'>
                        {processing&& <Loader2 className='h-4 w-4 animate-spin' />}
                        <span>Submit</span>
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default NewPhaseModal