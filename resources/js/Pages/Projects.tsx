import { Button } from '@/Components/ui/button';
import Layout from '@/Layout/Layout';
import {FC, useState,useRef, FormEventHandler, useCallback} from 'react';
import {PlusCircle,Download} from 'lucide-react'
import { Table, TableBody,  TableHead, TableHeader, TableRow } from '@/Components/ui/table';
import { PaginatedProject, Project } from '@/Components/types';
import { useProjectModal } from '@/Hooks/useProjectModal';
import ProjectItem from '@/Components/Project/ProjectItem';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import {ChevronsLeft,ChevronLeftIcon,ChevronRightIcon,ChevronsRight,ChevronsUpDown} from 'lucide-react';
import { useForm } from '@inertiajs/inertia-react';
import { Input } from '@/Components/ui/input';
import ProjectHeader from '@/Components/Project/ProjectHeader';
import ActionTooltip from '@/Components/ActionTooltip';

type FIELD ="name"|"description"|"location"|"manpower"|"in_house"|"third_party"|"date_started"|"target_date"|"status"|"completion_date"|"remarks"|"created_at"|"updated_at";

interface ProjectProps{
    projects:PaginatedProject,
    per_page?:string;
    sort:FIELD;
    order:'asc'|'desc';
    name_filter:string;
}


const Projects:FC<ProjectProps> = ({projects,per_page,sort,order,name_filter}) => {
    const {onOpen} = useProjectModal();
    const input=useRef<HTMLInputElement>(null);
    const [filter,setFilter] = useState(name_filter||"");
    const [perPage,setPerPage] = useState(per_page||"10");
    const [sortBy,setSortBy] = useState<{
        field:FIELD
        order:typeof order
    }>({field:sort,order});
    const { get } = useForm();
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
        get(route('projects.index',{
            filter,
            perPage:newPerPage?newPerPage:perPage,
            sort:sort?sort:sortBy.field,
            order:sort?newOrder:sortBy.order
        }),{
            preserveScroll:true,
            preserveState:sort?true:false
        })
    }
    

    return (
        <Layout label='Projects' >
            <div className='h-full flex flex-col space-y-2.5 overflow-y-hidden'>
                <div className='overflow-hidden flex flex-col md:flex-row space-y-1 md:space-y-0 md:justify-between md:items-center'>
                    <Button onClick={()=>onOpen('StoreProject')} size='sm' variant='outline' className='flex text-base justify-center md:justify-start items-center'>
                        <PlusCircle className='mr-2 h-5 w-5' />
                        <span>New Project</span>
                    </Button>
                    <ActionTooltip side='right' label='Reporting Work in Progress...'>
                        <Button size='sm' variant='secondary' className='flex text-base justify-center md:justify-start items-center'>
                            <Download className='mr-2 h-5 w-5' />
                            <span>Download Report</span>
                        </Button>
                    </ActionTooltip>
                    {/* <DatePicker date={new Date().toString()} setDate={()=>{}} /> */}
                </div>
                <div className='max-w-[150vw] flex-1 overflow-auto flex relative'>
                    <Table >
                        <TableHeader className='sticky top-0 z-50 bg-background'>
                            <TableRow className='z-50 ring-1 ring-secondary'>
                                <TableHead colSpan={4} />
                                <TableHead colSpan={2} className='text-center text-base'>Quotation</TableHead>
                                <TableHead colSpan={8} />
                            </TableRow>
                            <TableRow className='-mt-0.5 z-50 text-sm'>
                                <TableHead> <ProjectHeader onClick={()=>handleFilter(perPage,'name')}>Name</ProjectHeader> </TableHead>
                                <TableHead> <ProjectHeader onClick={()=>handleFilter(perPage,'description')}>Description</ProjectHeader> </TableHead>
                                <TableHead> <ProjectHeader onClick={()=>handleFilter(perPage,'location')}>Location</ProjectHeader> </TableHead>
                                <TableHead> <ProjectHeader onClick={()=>handleFilter(perPage,'manpower')}>Manpower</ProjectHeader> </TableHead>
                                <TableHead> <ProjectHeader onClick={()=>handleFilter(perPage,'in_house')}>In-House</ProjectHeader> </TableHead>
                                <TableHead> <ProjectHeader onClick={()=>handleFilter(perPage,'third_party')}>3rd Party</ProjectHeader> </TableHead>
                                <TableHead> <ProjectHeader onClick={()=>handleFilter(perPage,'date_started')}>Date started</ProjectHeader> </TableHead>
                                <TableHead> <ProjectHeader onClick={()=>handleFilter(perPage,'target_date')}>Targe Date</ProjectHeader> </TableHead>
                                <TableHead> <ProjectHeader onClick={()=>handleFilter(perPage,'status')}>Status</ProjectHeader> </TableHead>
                                <TableHead> <ProjectHeader onClick={()=>handleFilter(perPage,'completion_date')}>Completion Date</ProjectHeader> </TableHead>
                                <TableHead> <ProjectHeader onClick={()=>handleFilter(perPage,'remarks')}>Remarks</ProjectHeader> </TableHead>
                                <TableHead> <ProjectHeader onClick={()=>handleFilter(perPage,'created_at')}>Create Date</ProjectHeader> </TableHead>
                                <TableHead> <ProjectHeader onClick={()=>handleFilter(perPage,'updated_at')}>Update Date</ProjectHeader> </TableHead>
                                <TableHead> Actions </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody className='z-40'>
                            {
                                projects.data.map((project:Project)=><ProjectItem key={project.id} project={project} />)
                            }
                        </TableBody>
                    </Table>
                </div>
                <div className='h-auto'>
                    <div className="flex flex-col space-y-1 md:space-y-0 md:flex-row items-center md:justify-between p-2">
                        <form className='w-full md:w-auto' onSubmit={onSubmit}>
                            <Input className='w-full md:w-auto' value={filter} onChange={({target})=>setFilter(target.value)} ref={input} placeholder='Search Project Name....' />
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
                                Page&nbsp;{projects.current_page.toString()}&nbsp;of&nbsp;{projects.last_page}
                            </div>
                            <div className="flex items-center space-x-2">
                                <Button variant="outline" className="hidden h-8 w-8 p-0 lg:flex" onClick={() => get(projects.first_page_url)} disabled={projects.current_page===1} >
                                    <span className="sr-only">Go to first page</span>
                                    <ChevronsLeft className="h-4 w-4" />
                                </Button>
                                <Button variant="outline" className="h-8 w-8 p-0" onClick={()=>projects.prev_page_url&&get(projects.prev_page_url)} disabled={!projects?.prev_page_url}>
                                    <span className="sr-only">Go to previous page</span>
                                    <ChevronLeftIcon className="h-4 w-4" />
                                </Button>
                                <Button variant="outline" className="h-8 w-8 p-0" onClick={()=>projects.next_page_url&&get(projects.next_page_url)} disabled={!projects?.next_page_url}>
                                    <span className="sr-only">Go to next page</span>
                                    <ChevronRightIcon className="h-4 w-4" />
                                </Button>
                                <Button variant="outline" className="hidden h-8 w-8 p-0 lg:flex" onClick={() => get(projects.last_page_url)} disabled={projects.current_page===projects.last_page} >
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

export default Projects