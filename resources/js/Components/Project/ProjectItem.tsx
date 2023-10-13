import {FC} from 'react'
import { Project } from '../types'
import { TableCell, TableRow } from '../ui/table';
import { format } from 'date-fns';
import ProjectItemActions from './ProjectItemActions';
import { BadgeHelp, HelpCircle } from 'lucide-react';
import { useForm } from '@inertiajs/inertia-react';

interface ProjectItemProps{
    project:Project;
}

const ProjectItem:FC<ProjectItemProps> = ({project}) => {
    const {name,description,location,manpower,in_house,third_party,actual_cost,date_started,target_date,status,completion_date,remarks,created_at,updated_at} = project;
    const formatDt = (date:string) =>format(new Date(date),'P');

    const {get} = useForm();

    const navigate = () =>{
        get(route('quotations.index',{
            project_id:project.id,
            filter:"",
            perPage:null,
            sort:null,
            order:null
        }))
    }

    return (
        
        <TableRow className='text-sm'>
            <TableCell className="font-medium">{name}</TableCell>
            <TableCell>{description}</TableCell>
            <TableCell>{location}</TableCell>
            <TableCell className="text-right">{manpower}</TableCell>
            <TableCell className="text-right">{in_house}</TableCell>
            <TableCell className="text-right">{third_party}</TableCell>
            <TableCell className="text-right">
                {actual_cost}<span onClick={navigate} className=' font-serif text-muted-foreground font-extrabold text-base rounded-full px-3.5 py-1.5 cursor-pointer hover:text-primary transition'>i</span>
            </TableCell>
            <TableCell className="text-right">{formatDt(date_started)}</TableCell>
            <TableCell className="text-right">{formatDt(target_date)}</TableCell>
            <TableCell className="text-right">{status}</TableCell>
            <TableCell className="text-right">{completion_date?formatDt(completion_date):""}</TableCell>
            <TableCell className="text-right">{remarks}</TableCell>
            <TableCell className="text-right">{formatDt(created_at)}</TableCell>
            <TableCell className="text-right">{formatDt(updated_at)}</TableCell>
            
            <TableCell className="text-right">
                <ProjectItemActions project={project} />
            </TableCell>
        </TableRow>
    )
}

export default ProjectItem