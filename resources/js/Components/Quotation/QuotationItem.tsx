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
            <TableCell className=''>{status}</TableCell>
            <TableCell className="text-right">{formatDt(created_at)}</TableCell>
            <TableCell className="text-right">{formatDt(updated_at)}</TableCell>
            
            
            <TableCell className="flex items-center justify-end space-x-1.5">
                <ActionTooltip label='Edit'>
                    <Button onClick={()=>onOpen('StoreQuotation',{project:quotation.project,quotation:quotation})} className='text-sm' size='icon' variant='default'>
                        <FileSignature className='w-5 h-5 ' />
                    </Button>
                </ActionTooltip>
                <ActionTooltip label='Cancel'>
                    <Button className='text-sm' size='icon' variant='destructive' disabled={status==='Cancelled'}>
                        <CircleOff className='h-5 w-5 ' />
                    </Button>
                </ActionTooltip>
                <ActionTooltip label='Approve'>
                    <Button className='text-sm border-green-500 dark:text-green-400' size='icon' variant='outline'>
                        <ThumbsUp className='h-5 w-5 text-green-500 dark:text-green-400' />
                    </Button>
                </ActionTooltip>
                <ActionTooltip label='E-Mail Request'>
                    <Button onClick={()=>onOpen('RequestQuotation',{quotation})} className='text-sm' size='icon' variant='outline'>
                        <MailPlus className='h-5 w-5 ' />
                    </Button>
                </ActionTooltip>
            </TableCell>
        </TableRow>
    );
}

export default QuotationItem