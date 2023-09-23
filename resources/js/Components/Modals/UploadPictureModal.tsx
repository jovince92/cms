import {FC, useEffect, useMemo} from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog'
import { Button } from '../ui/button'
import { useImageModal } from '@/Hooks/useImageModal'
import Dropzone, {useDropzone} from 'react-dropzone';
import { Loader2, UploadCloud } from 'lucide-react';
import { useForm } from '@inertiajs/inertia-react';
import { toast } from 'react-toastify';

const UploadPictureModal:FC = () => {
    const {project,onClose,isOpen} = useImageModal();
    
    const { post,processing,errors,setData } = useForm<{image:File}>();
    
    
    useEffect(()=>{
        if(errors.image){
            toast.error(errors.image);
        }
    },[errors.image])

    if(!project){
        return null;
    }

    const onDrop = (e:File[]) =>{
        setData('image',e[0]);
    }

    const onUpload = () =>{
        post(route('pictures.store',{
            project_id:project.id
        }),{
            onError:()=>toast.error('Something went wrong. Please try again.')
        })
    }
    

    return (
        <Dialog onOpenChange={onClose} open={isOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Upload Image</DialogTitle>
                    <DialogDescription>
                        Upload Image to Project: {project.name}
                    </DialogDescription>
                </DialogHeader>
                <Dropzone multiple={false} onDrop={onDrop}>
                    {({getRootProps, getInputProps}) => (
                        <div className='border-2 border-dashed aspect-square flex items-center justify-center w-48 mx-auto p-12' {...getRootProps()}>
                            <input {...getInputProps()} />
                            <p>Drag 'n' drop some files here, or click to select files</p>
                        </div>
                    )}
                </Dropzone>
                <DialogFooter>
                    <Button onClick={onUpload} disabled={processing} type="button" variant='outline' size='sm' className='text-sm flex items-center'>
                        {
                            processing?<Loader2 className='mr-1.5 h-4 w-4 animate-spin'  />:<UploadCloud className='mr-1.5 h-4 w-4' />
                        }                        
                        <span>Upload</span>
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default UploadPictureModal;


