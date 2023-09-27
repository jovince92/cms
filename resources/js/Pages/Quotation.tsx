import ProjectHeader from '@/Components/Project/ProjectHeader'
import ProjectSelector from '@/Components/ProjectSelector'
import QuotationItem from '@/Components/Quotation/QuotationItem'
import { Pagination, Project, Quotation } from '@/Components/types'
import { Button } from '@/Components/ui/button'
import { Separator } from '@/Components/ui/separator'
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/Components/ui/table'
import { useQuotationModal } from '@/Hooks/useQuotationModal'
import Layout from '@/Layout/Layout'
import { useForm } from '@inertiajs/inertia-react'
import { PlusCircle } from 'lucide-react'
import {FC, useRef, useState} from 'react'


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
                    
                </div>
            </div>
        </Layout>
    )
}

export default Quotation