import AddressItem from '@/Components/Address/AddressItem';
import ProjectHeader from '@/Components/Project/ProjectHeader';
import { EmailAddress, Pagination } from '@/Components/types'
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardDescription, CardHeader,  CardTitle } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/Components/ui/table';
import { useAddressModal } from '@/Hooks/useAddressBookModal';
import Layout from '@/Layout/Layout';
import { useForm } from '@inertiajs/inertia-react';
import { ChevronLeftIcon, ChevronRightIcon, ChevronsLeft, ChevronsRight, PlusCircle } from 'lucide-react';
import { ChangeEventHandler, FC, FormEventHandler, useRef, useState } from 'react'


type FIELD ="first_name"|"last_name"|"email"|"created_at"|"updated_at";

type PaginatedAddresses = Pagination &{ data:EmailAddress[]}

interface Props{
    addresses: PaginatedAddresses;
    per_page:string;
    sort:FIELD;
    order:string;
    filter:string;
}



const AddressBook:FC<Props> = ({addresses,per_page,sort,order,filter:PrevFilter}) => {
    
    const { get } = useForm();
    const {onOpen} = useAddressModal();
    const input=useRef<HTMLInputElement>(null);
    const [filter,setFilter] = useState(PrevFilter||"");
    const [perPage,setPerPage] = useState(per_page||"10");
    const [sortBy,setSortBy] = useState<{
        field:FIELD
        order:typeof order
    }>({field:sort,order});
    const handleFilter = (newPerPage?:string,sort?:typeof sortBy.field) =>{
        let newOrder = sortBy.order;
        if(newPerPage){
            setPerPage(perPage);
        }
        if(sort){
            newOrder=sortBy.order!=='asc'?'asc':'desc'
            setSortBy({field:sort,order:newOrder});
        }
        get(route('addresses.index',{
            filter,
            perPage:newPerPage?newPerPage:perPage,
            sort:sort?sort:sortBy.field,
            order:sort?newOrder:sortBy.order
        }),{
            preserveScroll:true,
            preserveState:sort?true:false
        })
    }
    const onSubmit:FormEventHandler<HTMLFormElement> = (e) =>{
        e.preventDefault();
        handleFilter();
    }
    return (
        <Layout label='Address Book'>
            <div className='h-full flex flex-col space-y-2.5 overflow-y-hidden'>
                <div className='overflow-hidden flex flex-col md:flex-row space-y-1 md:space-y-0 md:justify-between md:items-center'>
                    
                    <Button  onClick={()=>onOpen('StoreAddress')} size='sm' variant='outline' className='flex text-base justify-center md:justify-start items-center'>
                        <PlusCircle className='mr-2 h-5 w-5' />
                        <span>Add To Address Book</span>
                    </Button>
                </div>
                <div className='flex-1 overflow-auto flex flex-col relative'>
                    <Table >
                        <TableHeader className='sticky top-0 z-50 bg-background'>
                            <TableRow className='-mt-0.5 z-50 text-sm'>
                                {/* <TableHead> <ProjectHeader onClick={()=>handleFilter(perPage,'project_name')}>Project</ProjectHeader> </TableHead> */}
                                <TableHead className='text-left'> <ProjectHeader onClick={()=>handleFilter(perPage,'email')}>Email</ProjectHeader> </TableHead>
                                <TableHead className='text-right'> <ProjectHeader onClick={()=>handleFilter(perPage,'first_name')}>First Name</ProjectHeader> </TableHead>
                                <TableHead className='text-right'> <ProjectHeader onClick={()=>handleFilter(perPage,'last_name')}>Last Name</ProjectHeader> </TableHead>
                                <TableHead className='text-right'> <ProjectHeader onClick={()=>handleFilter(perPage,'created_at')}>Add Date</ProjectHeader> </TableHead>
                                <TableHead className='text-right'> <ProjectHeader onClick={()=>handleFilter(perPage,'updated_at')}>Update Date</ProjectHeader> </TableHead>
                                <TableHead className='text-right'> Actions </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody className='z-40'>
                            {
                                addresses.data.map(address=><AddressItem key={address.id} address={address} />)
                            }
                        </TableBody>
                    </Table>
                </div>
                <div className='h-auto'>
                    <div className="flex flex-col space-y-1 md:space-y-0 md:flex-row items-center md:justify-between p-2">
                        <form className='w-full md:w-auto' onSubmit={onSubmit}>
                            <Input className='w-full md:w-auto' value={filter} onChange={({target})=>setFilter(target.value)} ref={input} placeholder='Email/First Name/Last Name...' />
                        </form>
                        <div className="flex items-center space-x-6 lg:space-x-8">
                            <div className="flex items-center space-x-2">
                                <p className="text-sm font-medium">Rows per page</p>
                                <Select value={perPage.toString()} onValueChange={(val)=>{handleFilter(val)}} >
                                    <SelectTrigger className="h-8 w-[4.375rem]">
                                        <SelectValue placeholder='Select...' />
                                    </SelectTrigger>
                                    <SelectContent side="top">
                                        {[5,10, 20, 30, 40, 50, 100].map((pageSize) => (
                                            <SelectItem key={pageSize} value={`${pageSize}`}>
                                            {pageSize}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex w-[100px] items-center justify-center text-sm font-medium">
                                Page&nbsp;{addresses.current_page.toString()}&nbsp;of&nbsp;{addresses.last_page}
                            </div>
                            <div className="flex items-center space-x-2">
                                <Button variant="outline" className="hidden h-8 w-8 p-0 lg:flex" onClick={() => get(addresses.first_page_url)} disabled={addresses.current_page===1} >
                                    <span className="sr-only">Go to first page</span>
                                    <ChevronsLeft className="h-4 w-4" />
                                </Button>
                                <Button variant="outline" className="h-8 w-8 p-0" onClick={()=>addresses.prev_page_url&&get(addresses.prev_page_url)} disabled={!addresses?.prev_page_url}>
                                    <span className="sr-only">Go to previous page</span>
                                    <ChevronLeftIcon className="h-4 w-4" />
                                </Button>
                                <Button variant="outline" className="h-8 w-8 p-0" onClick={()=>addresses.next_page_url&&get(addresses.next_page_url)} disabled={!addresses?.next_page_url}>
                                    <span className="sr-only">Go to next page</span>
                                    <ChevronRightIcon className="h-4 w-4" />
                                </Button>
                                <Button variant="outline" className="hidden h-8 w-8 p-0 lg:flex" onClick={() => get(addresses.last_page_url)} disabled={addresses.current_page===addresses.last_page} >
                                    <span className="sr-only">Go to last page</span>
                                    <ChevronsRight className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default AddressBook