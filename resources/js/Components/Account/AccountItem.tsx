import React, { FC } from 'react'
import { User } from '../types'
import { TableCell, TableRow } from '../ui/table'
import { format } from 'date-fns'
import ActionTooltip from '../ActionTooltip'
import { Button } from '../ui/button'
import { FileSignature } from 'lucide-react'
import { useAccountModal } from '@/Hooks/useAccountModal'

interface AccountItemProps{
    account:User
}

const AccountItem:FC<AccountItemProps> = ({account}) => {
    const {onOpen} = useAccountModal();
    return (
        <TableRow className='text-sm'>
            <TableCell className="font-medium">{account.company_id}</TableCell>
            <TableCell className='text-right'>{account.name}</TableCell>
            <TableCell className='text-right'>{format(new Date(account.created_at),'PPpp')}</TableCell>
            
            
            <TableCell className="flex items-center justify-end space-x-1.5">
                <ActionTooltip label='Edit'>
                    <Button  onClick={()=>onOpen('StoreAccount',account)} className='text-sm' size='sm' variant='outline'>
                        <FileSignature className='w-4 h-4 ' />
                    </Button>
                </ActionTooltip>
            </TableCell>
        </TableRow>
    )
}

export default AccountItem