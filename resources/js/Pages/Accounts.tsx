import { Button } from '@/Components/ui/button'
import { useAccountModal } from '@/Hooks/useAccountModal'
import Layout from '@/Layout/Layout'
import { UserPlus2 } from 'lucide-react'
import React from 'react'

const Accounts = () => {
    const {onOpen} = useAccountModal();
    return (
        <Layout label='Accounts'>
            <div className='overflow-hidden flex flex-col md:flex-row space-y-1 md:space-y-0 md:justify-between md:items-center'>
                <Button onClick={()=>onOpen('StoreAccount')} size='sm' variant='outline' className='flex text-base justify-center md:justify-start items-center'>
                    <UserPlus2 className='mr-2 h-5 w-5' />
                    <span>New Account</span>
                </Button>
            </div>
            <div className='flex-1 overflow-auto flex flex-col relative'>
                
            </div>
        </Layout>
    )
}

export default Accounts