import RequestModal from '@/Components/Modals/RequestModal'
import ProjectHeader from '@/Components/Project/ProjectHeader'
import ProjectSelector from '@/Components/ProjectSelector'
import QuotationItem from '@/Components/Quotation/QuotationItem'
import { Pagination, Project, Quotation } from '@/Components/types'
import { Button } from '@/Components/ui/button'
import { Input } from '@/Components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select'
import { Separator } from '@/Components/ui/separator'
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/Components/ui/table'
import { useQuotationModal } from '@/Hooks/useQuotationModal'
import Layout from '@/Layout/Layout'
import { useForm } from '@inertiajs/inertia-react'
import { ChevronLeftIcon, ChevronRightIcon, ChevronsLeft, ChevronsRight, PlusCircle } from 'lucide-react'
import {FC, FormEventHandler, useRef, useState} from 'react'


type FIELD ="project_name"|"requisition_number"|"grand_total"|"status"|"created_at"|"updated_at";

type PaginatedQuotations = Pagination &{ data:Quotation[]}

interface QuotationProps{
    quotations: PaginatedQuotations;
    selected_project:Project;
    per_page:string;
    sort:FIELD;
    order:string;
    requisition_number:string;
}

const Quotation:FC<QuotationProps> = ({selected_project,quotations,per_page,sort,order,requisition_number}) => {
    const { get } = useForm();
    const {onOpen} = useQuotationModal();
    const input=useRef<HTMLInputElement>(null);
    const [filter,setFilter] = useState(requisition_number||"");
    const [perPage,setPerPage] = useState(per_page||"10");
    const [sortBy,setSortBy] = useState<{
        field:FIELD
        order:typeof order
    }>({field:sort,order});
    const onSelect = (projectId:string) =>{
        get(route('quotations.index',{
            project_id:projectId
        }));
    }

    const onSubmit:FormEventHandler<HTMLFormElement> = (e) =>{
        e.preventDefault();
        handleFilter();
    }

    const handleFilter = (newPerPage?:string,sort?:typeof sortBy.field) =>{
        let newOrder = sortBy.order;
        if(newPerPage){
            setPerPage(perPage);
        }
        if(sort){
            newOrder=sortBy.order!=='asc'?'asc':'desc'
            setSortBy({field:sort,order:newOrder});
        }
        get(route('quotations.index',{
            project_id:selected_project?selected_project.id:null,
            filter,
            perPage:newPerPage?newPerPage:perPage,
            sort:sort?sort:sortBy.field,
            order:sort?newOrder:sortBy.order
        }),{
            preserveScroll:true,
            preserveState:sort?true:false
        })
    }

    const openModal = () =>{
        const quotationIds=quotations.data.map(({id})=>id);
        const nextId = quotationIds.length<1?0:(Math.max(...quotationIds)+1);
        onOpen('StoreQuotation',{project:selected_project,itemsCount:nextId})
    }
    
    return (
        <>
            <RequestModal />
            <Layout label='Quotation'>
                <div className='h-full flex flex-col space-y-2.5 overflow-y-hidden'>
                    <div className='overflow-hidden flex flex-col md:flex-row space-y-1 md:space-y-0 md:justify-between md:items-center'>
                        
                        <Button disabled={!selected_project} onClick={openModal} size='sm' variant='outline' className='flex text-base justify-center md:justify-start items-center'>
                            <PlusCircle className='mr-2 h-5 w-5' />
                            <span>New Quotation</span>
                        </Button>
                            
                        <ProjectSelector className='ml-auto' onSelect={onSelect} selectedProjectId={selected_project?.id.toString()} />
                    </div>
                    <div className='flex-1 overflow-auto flex flex-col relative'>
                        <Table >
                            <TableHeader className='sticky top-0 z-50 bg-background'>
                                <TableRow className='-mt-0.5 z-50 text-sm'>
                                    {/* <TableHead> <ProjectHeader onClick={()=>handleFilter(perPage,'project_name')}>Project</ProjectHeader> </TableHead> */}
                                    <TableHead className='min-w-[10rem]'> Project </TableHead>
                                    <TableHead> <ProjectHeader onClick={()=>handleFilter(perPage,'requisition_number')}>Requisition Number</ProjectHeader> </TableHead>
                                    <TableHead> <ProjectHeader onClick={()=>handleFilter(perPage,'grand_total')}>Grand Total</ProjectHeader> </TableHead>
                                    <TableHead> <ProjectHeader onClick={()=>handleFilter(perPage,'status')}>Status</ProjectHeader> </TableHead>
                                    <TableHead> <ProjectHeader onClick={()=>handleFilter(perPage,'created_at')}>Create Date</ProjectHeader> </TableHead>
                                    <TableHead> <ProjectHeader onClick={()=>handleFilter(perPage,'updated_at')}>Update Date</ProjectHeader> </TableHead>
                                    <TableHead> Actions </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody className='z-40'>
                                {
                                    quotations.data.map(quotation=><QuotationItem key={quotation.id} quotation={quotation} />)
                                }
                            </TableBody>
                        </Table>
                    </div>
                    <div className='h-auto'>
                        <div className="flex flex-col space-y-1 md:space-y-0 md:flex-row items-center md:justify-between p-2">
                            <form className='w-full md:w-auto' onSubmit={onSubmit}>
                                <Input className='w-full md:w-auto' value={filter} onChange={({target})=>setFilter(target.value)} ref={input} placeholder='Search Requisition#....' />
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
                                    Page&nbsp;{quotations.current_page.toString()}&nbsp;of&nbsp;{quotations.last_page}
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Button variant="outline" className="hidden h-8 w-8 p-0 lg:flex" onClick={() => get(quotations.first_page_url)} disabled={quotations.current_page===1} >
                                        <span className="sr-only">Go to first page</span>
                                        <ChevronsLeft className="h-4 w-4" />
                                    </Button>
                                    <Button variant="outline" className="h-8 w-8 p-0" onClick={()=>quotations.prev_page_url&&get(quotations.prev_page_url)} disabled={!quotations?.prev_page_url}>
                                        <span className="sr-only">Go to previous page</span>
                                        <ChevronLeftIcon className="h-4 w-4" />
                                    </Button>
                                    <Button variant="outline" className="h-8 w-8 p-0" onClick={()=>quotations.next_page_url&&get(quotations.next_page_url)} disabled={!quotations?.next_page_url}>
                                        <span className="sr-only">Go to next page</span>
                                        <ChevronRightIcon className="h-4 w-4" />
                                    </Button>
                                    <Button variant="outline" className="hidden h-8 w-8 p-0 lg:flex" onClick={() => get(quotations.last_page_url)} disabled={quotations.current_page===quotations.last_page} >
                                        <span className="sr-only">Go to last page</span>
                                        <ChevronsRight className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}

export default Quotation