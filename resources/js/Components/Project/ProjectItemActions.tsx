import React, { FC } from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Button } from '../ui/button';
import {MoreHorizontal} from 'lucide-react'
import { Project } from '../types';
import { useProjectModal } from '@/Hooks/useProjectModal';

interface ProjectItemActionsProps{
    project:Project;
}

const ProjectItemActions:FC<ProjectItemActionsProps> = ({project}) => {
    const {onOpen} = useProjectModal();
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem className='cursor-pointer' onClick={()=>onOpen('StoreProject',project)}>
                    Edit
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className='cursor-pointer'>
                    View Stages
                </DropdownMenuItem>
                <DropdownMenuItem className='cursor-pointer' onClick={()=>onOpen('DeleteProject',project)}>
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default ProjectItemActions