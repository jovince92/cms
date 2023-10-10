import  { FC, MouseEventHandler, ReactNode, useEffect, useMemo, useRef, useState } from 'react';
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
import { Ban,  Loader2, MailPlus, Send, XCircle } from 'lucide-react';
import ActionTooltip from '../ActionTooltip';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '../ui/command';
import { cn } from '@/lib/utils';
import { usePage } from '@inertiajs/inertia-react';
import { Page } from '@inertiajs/inertia';
import { EmailAddress, PageProps } from '../types';

const RequestModal:FC = () => {
    const [sending,setSending] = useState(false);
    const subj = useRef<HTMLInputElement>(null);
    const {isOpen,type,onClose,emailMsg,emailSubject,data:QuotationModalData} = useQuotationModal();
    const {editor} = useEditorConfig();
    const OPEN = useMemo(()=>isOpen&&type==='RequestQuotation',[isOpen,type]);
    const [to,setTo] = useState<EmailAddress[]>([]);
    const [addressBook,setAddressBook] = useState<EmailAddress[]>([]);
    const [showList,setShowList] = useState(false);

    const onSubmit = () =>{
        
        if(!QuotationModalData?.quotation) return;
        if (!emailMsg) return;
        if (!editor) return;
        if (!subj.current) return;
        const subjectLine = subj.current.value;
        

        if (editor.getHTML().length<25) return toast.info('Email Request Message is too short');
        if (!subjectLine||subjectLine.length<20) return toast.info('Subject Line is too short');
        if (!to||to.length<1) return toast.info('Please add Recipients');
        //console.log(editor.getHTML());
        setSending(true);
        axios.post(route('quotations.mail_request',{
            project_id:QuotationModalData.quotation.project_id
        }),{
            emails:to,
            body:editor.getHTML(),
            subject:subjectLine,
            quotation_id:QuotationModalData.quotation.id
        })
        .then(()=>{
            onClose();
            toast.success('Request Email Sent. Awaiting Approval...')
        })
        .catch(()=>toast.error('Something Went Wrong. Please Try Again...'))
        .finally(()=>setSending(false));
        
    }

    useEffect(()=>{
        if(subj.current){
            subj.current.value=emailSubject||"";
        }
    },[emailSubject,subj]);

    useEffect(()=>{
        if(!OPEN) {
            setTo([]);
            setAddressBook([]);
            return;
        };
        axios.get(route('addresses.show'))
        .then(({data})=>setAddressBook(data))
        .catch(()=>{
            toast.error('Server Error. Please refresh the page');
        });
    },[OPEN]);

    if(!emailMsg){
        return null;
    }

    if(!editor){
        return null;
    }

    const handleAddressSelect = (address:EmailAddress) =>{
        if(to.findIndex(({id})=>id===address.id)>0) return null;
        setTo(val=>[...val,address]);
    }

    const onRemove = (to:EmailAddress) =>{
        setTo(val=>val.filter(address=>address.id!==to.id));
    }

    return (
        <Dialog open={OPEN} onOpenChange={onClose}>
            <DialogContent className='max-w-[90vw] max-h-[95vh] h-full flex flex-col space-x-1.5'>
                <div className='w-full flex flex-col space-y-1.5'>
                    <p className='font-semibold text-lg'>Send Request Email</p>
                    <Separator />
                    <div className='flex space-x-1.5 items-center justify-end'>
                        <Label htmlFor='subject' className=''>Subject:</Label>
                        <Input id='subject' ref={subj} className='flex-1' />
                    </div>
                    <div className='flex space-x-1.5 items-center justify-end'>
                        <Label htmlFor='to' className=''>To:</Label>
                        <div className='flex-1 flex items-center flex-wrap min-h-[2.75rem] p-2 rounded-md bg-background border border-muted gap-1.5'>
                            {
                                to.map(address=><ToItem key={address.id} to={address} onRemove={onRemove} />)
                            }
                        </div>
                        <Popover open={showList} onOpenChange={setShowList}>
                            
                            <PopoverTrigger asChild>
                                <Button disabled={!addressBook||addressBook.length<1} variant='outline' size='sm'>
                                    <MailPlus className='h-6 w-6' />
                                </Button>
                            </PopoverTrigger>
                            
                            
                            <PopoverContent className="w-52 max-h-96 overflow-y-auto p-0">
                                <Command>
                                <CommandInput placeholder="Search Emails..." />
                                <CommandEmpty>No Email Found.</CommandEmpty>
                                <CommandGroup>
                                    {addressBook.map((address) => (

                                        <CommandItem
                                            className={cn(to.findIndex(({id})=>id===address.id)>-1&&'text-muted')}
                                            key={address.id}
                                            onSelect={() => {
                                                handleAddressSelect(address);
                                                setShowList(false)
                                                }}>
                                            {address.email}
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                                </Command>
                            </PopoverContent>
                            </Popover>
                            
                        
                    </div>
                    <Separator />
                </div>
                <div className='w-full flex-1 flex flex-col max-h-fit overflow-y-auto'>
                    <TipTap editor={editor} content={emailMsg} />
                </div>
                <div className='flex items-center justify-end space-x-1.5'>
                    <Button variant='secondary' size='sm' className='text-base flex items-center space-x-1.5'>
                        <Ban className='w-4 h-4' />
                        <span>Cancel</span>
                    </Button>
                    <Button onClick={onSubmit} variant='outline' size='sm' className='text-base flex items-center space-x-1.5'>
                        {!sending?<Send className='w-4 h-4' />:<Loader2 className='h-4 w-4 animate-spin' />}
                        <span>Send Request</span>
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default RequestModal;

interface ToItemProps{
    onRemove:(address:EmailAddress)=>void;
    to:EmailAddress;
}

const ToItem:FC<ToItemProps> = ({onRemove,to}) =>{
    
    const handleRemove:MouseEventHandler = (e) =>{
        e.stopPropagation();
        onRemove(to);
    }


    return(
        <Button variant='secondary' className='!cursor-default relative group' size='sm'>
            <XCircle onClick={handleRemove} className='opacity-30 group-hover:opacity-100 transition duration-300 cursor-pointer text-destructive h-4 w-4 absolute top-0 right-0' />
            <span>{`${to.first_name} ${to.last_name||''}`}</span>
        </Button>
    );
}



