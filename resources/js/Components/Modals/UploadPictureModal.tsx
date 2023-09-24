import {FC, useEffect, useMemo, useState} from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog'
import { Button } from '../ui/button'
import { useImageModal } from '@/Hooks/useImageModal'
import Dropzone, {useDropzone} from 'react-dropzone';
import { Loader2, UploadCloud } from 'lucide-react';
import { useForm } from '@inertiajs/inertia-react';
import { toast } from 'react-toastify';

const UploadPictureModal:FC = () => {
    const {data,onClose,isOpen,type} = useImageModal();
    const [preview,setPreview] = useState<string|null>(null);
    const { post,processing,errors,setData } = useForm<{image:File}>();
    
    
    useEffect(()=>{
        if(errors.image){
            toast.error(errors.image);
        }
    },[errors.image])


    const onDrop = (e:File[]) =>{
        setData('image',e[0]);
        setPreview(URL.createObjectURL(e[0]));
    }

    
    
    const OPEN = useMemo(()=>type==='UploadImage'&&isOpen,[type,isOpen]);
    useEffect(()=>setPreview(null),[isOpen]);
    
    if(!data?.project){
        return null;
    }
    const onUpload = () =>{
        if(!data?.project?.id){
            return null;
        }
        post(route('pictures.store',{
            project_id:data.project.id
        }),{
            onError:()=>toast.error('Something went wrong. Please try again.'),
            onSuccess:()=>{
                toast.success('Image Uploaded');
                onClose();
            }
        })
    }


    return (
        <Dialog onOpenChange={onClose} open={OPEN}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Upload Image</DialogTitle>
                    <DialogDescription>
                        Upload Image to Project: {data.project.name}
                    </DialogDescription>
                </DialogHeader>
                
                <Dropzone multiple={false} onDrop={onDrop}>
                    {({getRootProps, getInputProps}) => (
                        <div className='border-2 border-dashed aspect-square flex items-center justify-center w-48 h-48 mx-auto p-12' {...getRootProps()}>
                            <input  {...getInputProps()} />
                            {!preview?<p>Drag 'n' drop some files here, or click to select files</p>:<img src={preview} className='h-full w-full aspect-square' />}
                            
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


