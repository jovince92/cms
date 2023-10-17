import AccountItem from '@/Components/Account/AccountItem'
import { User } from '@/Components/types'
import { Button } from '@/Components/ui/button'
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/Components/ui/table'
import { useAccountModal } from '@/Hooks/useAccountModal'
import Layout from '@/Layout/Layout'
import { UserPlus2 } from 'lucide-react'
import React, { FC } from 'react'

interface Props{
    accounts:User[];
}

const Accounts:FC<Props> = ({accounts}) => {
    const {onOpen} = useAccountModal();
    return (
        <Layout label='Accounts'>
            <div className='h-full flex flex-col space-y-2.5 overflow-y-hidden'>
                <div className='overflow-hidden flex flex-col md:flex-row space-y-1 md:space-y-0 md:justify-between md:items-center'>
                    <Button onClick={()=>onOpen('StoreAccount')} size='sm' variant='outline' className='flex text-base justify-center md:justify-start items-center'>
                        <UserPlus2 className='mr-2 h-5 w-5' />
                        <span>New Account</span>
                    </Button>
                </div>
                <div className='flex-1 overflow-auto flex flex-col relative'>
                    <Table >
                        <TableHeader className='sticky top-0 z-50 bg-background'>
                            <TableRow className='-mt-0.5 z-50 text-sm'>
                                {/* <TableHead> <ProjectHeader onClick={()=>handleFilter(perPage,'project_name')}>Project</ProjectHeader> </TableHead> */}
                                <TableHead className='text-left'> Company ID </TableHead>
                                <TableHead className='text-right'> Name </TableHead>
                                <TableHead className='text-right'> Create Date </TableHead>
                                <TableHead className='text-right'> Actions </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody className='z-40'>
                            {
                                accounts.map(account=><AccountItem key={account.id} account={account} />)
                            }
                        </TableBody>
                    </Table>
                </div>
            </div>
        </Layout>
    )
}

export default Accounts