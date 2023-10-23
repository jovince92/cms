import {FC} from 'react'
import { Quotation } from '../types'
import { format } from 'date-fns';
import { TableCell, TableRow } from '../ui/table';
import { Button } from '../ui/button';
import ActionTooltip from '../ActionTooltip';
import { CircleOff, FileSignature, MailPlus, ThumbsUp } from 'lucide-react';
import { useQuotationModal } from '@/Hooks/useQuotationModal';

interface Props{
    quotation:Quotation;
}

const QuotationItem:FC<Props> = ({quotation}) => {
    const {onOpen} = useQuotationModal();
    const {requisition_number,grand_total,status,created_at,updated_at,project} = quotation;
    const formatDt = (date:string) =>format(new Date(date),'P');
    return (
        <TableRow className='text-sm'>
            <TableCell className="font-medium">{project.name}</TableCell>
            <TableCell className=''>{requisition_number}</TableCell>
            <TableCell className='text-right'>{new Intl.NumberFormat().format(grand_total)}</TableCell>
            <TableCell className=''>
                {
                    status==='Approved'?(
                        <div className='flex flex-col space-y-1.5 whitespace-nowrap'>
                            <p>{status}</p>
                            <p className='text-muted-foreground italic text-xs'>{`on ${format(new Date(updated_at),'Pp')}`}</p>
                        </div>
                    ):(
                        <span>{status}</span>
                    )
                }
                
            </TableCell>
            <TableCell className="text-right">{formatDt(created_at)}</TableCell>
            <TableCell className="text-right">{formatDt(updated_at)}</TableCell>
            
            
            <TableCell className="flex items-center justify-end space-x-1.5">
                <ActionTooltip label='Edit'>
                    <Button disabled={quotation.status==='Approved' || quotation.status==='Cancelled'} onClick={()=>onOpen('StoreQuotation',{project:quotation.project,quotation:quotation})} className='text-sm' size='sm' variant='outline'>
                        <FileSignature className='w-4 h-4 ' />
                    </Button>
                </ActionTooltip>
                <ActionTooltip label='Cancel'>
                    <Button onClick={()=>onOpen('CancelQuotation',{quotation})} className='text-sm' size='sm' variant='destructive' disabled={status==='Cancelled'||status==='Approved'}>
                        <CircleOff className='h-4 w-4 ' />
                    </Button>
                </ActionTooltip>
                <ActionTooltip label='Approve'>
                    <Button onClick={()=>onOpen('ApproveQuotation',{quotation})} disabled={quotation.status==='Approved'||quotation.status==='Cancelled'} className='text-sm border-green-500 dark:text-green-400' size='sm' variant='outline'>
                        <ThumbsUp className='h-4 w-4 text-green-500 dark:text-green-400' />
                    </Button>
                </ActionTooltip>
                <ActionTooltip label='Send E-Mail Request'>
                    <Button disabled={quotation.status!=='Pending'} onClick={()=>onOpen('RequestQuotation',{quotation})} className='text-sm' size='sm' variant='outline'>
                        <MailPlus className='h-4 w-4 ' />
                    </Button>
                </ActionTooltip>
            </TableCell>
        </TableRow>
    );
}

export default QuotationItem