import  { FC, useEffect, useMemo, useRef, useState } from 'react';
import { Dialog, DialogContent } from '../ui/dialog';

import { useQuotationModal } from '@/Hooks/useQuotationModal';
import { Separator } from '../ui/separator';
import { Button } from '../ui/button';

import TipTap from '../TipTap/TipTap';
import axios from 'axios';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { useCurrentEditor } from '@tiptap/react';
import useEditorConfig from '@/Hooks/useEditorConfig';
import { toast } from 'react-toastify';

const RequestModal:FC = () => {
    const [sending,setSending] = useState(false);
    const subj = useRef<HTMLInputElement>(null);
    const {isOpen,type,onClose,emailMsg,emailSubject} = useQuotationModal();
    const {editor} = useEditorConfig();
    const OPEN = useMemo(()=>isOpen&&type==='RequestQuotation',[isOpen,type]);

    const onSubmit = () =>{
        if (!emailMsg) return;
        if (!editor) return;
        if (editor.getHTML().length<25) return toast.info('Email Request Message is too short');
        console.log(editor.getHTML());
        console.log(subj.current?.value);
        
    }

    useEffect(()=>{
        if(subj.current){
            subj.current.value=emailSubject||"";
        }
    },[emailSubject,subj]);

    if(!emailMsg){
        return null;
    }

    if(!editor){
        return null;
    }

    return (
        <Dialog open={OPEN} onOpenChange={onClose}>
            <DialogContent className='max-w-[90vw] max-h-[95vh] h-full flex flex-col space-x-1.5'>
                <div className='w-full flex flex-col space-y-1.5'>
                    <p className='font-semibold text-lg'>Send Request Email</p>
                    <Separator />
                    <div className='flex space-x-1.5 items-center justify-end'>
                        <Label className=''>Subject:</Label>
                        <Input  ref={subj} className='flex-1' />
                    </div>
                    <Separator />
                </div>
                <div className='w-full flex-1 flex flex-col max-h-fit overflow-y-auto'>
                    
                    <TipTap editor={editor} content={emailMsg} />
                </div>
                <div className='flex items-center justify-end space-x-1.5'>
                    <Button variant='secondary' size='sm' className='text-base'>Cancel</Button>
                    <Button onClick={onSubmit} variant='outline' size='sm' className='text-base'>Send Email</Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default RequestModal;


