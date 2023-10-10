import {FC} from 'react'
import { EmailAddress } from '../types'
import { TableCell, TableRow } from '../ui/table';
import ActionTooltip from '../ActionTooltip';
import { Button } from '../ui/button';
import { Trash2, FileSignature } from 'lucide-react';
import { format } from 'date-fns';
import { useAddressModal } from '@/Hooks/useAddressBookModal';

interface AddressItemProps{
    address:EmailAddress;
}

const AddressItem:FC<AddressItemProps> = ({address}) => {
    const {onOpen} = useAddressModal();
    const {first_name,last_name,email,created_at,updated_at} = address;
    
    const formatDt = (date:string) =>format(new Date(date),'P');
    return (
        <TableRow className='text-sm'>
            <TableCell className="font-medium">{email}</TableCell>
            <TableCell className='text-right'>{first_name}</TableCell>
            <TableCell className='text-right'>{last_name}</TableCell>
            <TableCell className="text-right">{formatDt(created_at)}</TableCell>
            <TableCell className="text-right">{formatDt(updated_at)}</TableCell>
            
            
            <TableCell className="flex items-center justify-end space-x-1.5">
                <ActionTooltip label='Edit'>
                    <Button onClick={()=>onOpen('StoreAddress',address)} className='text-sm' size='icon' variant='default'>
                        <FileSignature className='w-5 h-5 ' />
                    </Button>
                </ActionTooltip>
                <ActionTooltip label='Delete'>
                    <Button onClick={()=>onOpen('DeleteAddress',address)} className='text-sm' size='icon' variant='destructive'>
                        <Trash2 className='h-5 w-5 ' />
                    </Button>
                </ActionTooltip>
                
            </TableCell>
        </TableRow>
    )
}

export default AddressItem