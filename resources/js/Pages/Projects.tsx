import { Button } from '@/Components/ui/button';
import Layout from '@/Layout/Layout';
import {FC} from 'react';
import {PlusCircle,Download} from 'lucide-react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/Components/ui/table';
import { Project } from '@/Components/types';
import { useProjectModal } from '@/Hooks/useProjectModal';
import DatePicker from '@/Components/DatePicker';
import ProjectItem from '@/Components/Project/ProjectItem';
import { ScrollArea } from '@/Components/ui/scroll-area';

interface ProjectProps{
    projects:Project[]
}

const Projects:FC<ProjectProps> = ({projects}) => {
    const {onOpen} = useProjectModal();
    return (
        <Layout label='Projects' >
            <div className='h-full flex flex-col space-y-2.5 overflow-y-hidden'>
                <div className='overflow-hidden flex flex-col md:flex-row space-y-1 md:space-y-0 md:justify-between md:items-center'>
                    <Button onClick={()=>onOpen('StoreProject')} size='sm' variant='outline' className='flex text-base justify-center md:justify-start items-center'>
                        <PlusCircle className='mr-2 h-5 w-5' />
                        <span>New Project</span>
                    </Button>
                    <Button size='sm' variant='secondary' className='flex text-base justify-center md:justify-start items-center'>
                        <Download className='mr-2 h-5 w-5' />
                        <span>Download Report</span>
                    </Button>
                    {/* <DatePicker date={new Date().toString()} setDate={()=>{}} /> */}
                </div>
                <div className='max-w-[100vw] flex-1 overflow-auto flex'>
                    <Table >
                        <TableHeader>
                            <TableRow>
                                <TableHead colSpan={4} />
                                <TableHead colSpan={2} className='text-center text-base'>Quotation</TableHead>
                                <TableHead colSpan={7} />
                            </TableRow>
                            <TableRow className='text-sm'>
                                <TableHead>Name</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead>Location</TableHead>
                                <TableHead>Manpower</TableHead>
                                <TableHead>In-House</TableHead>
                                <TableHead>3rd Party</TableHead>
                                <TableHead>Date Started</TableHead>
                                <TableHead>Target Date</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Completion Date</TableHead>
                                <TableHead>Remarks</TableHead>
                                <TableHead>Create Date</TableHead>
                                <TableHead>Update Date</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody >
                            {
                                projects.map(project=><ProjectItem key={project.id} project={project} />)
                            }
                        </TableBody>
                    </Table>
                </div>
                <div className='h-12'>
                    Projects
                </div>
            </div>
        </Layout>
    )
}

export default Projects