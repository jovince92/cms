import React, { FC, useState } from 'react'
import {  PageProps, Project } from './types'
import { usePage } from '@inertiajs/inertia-react';
import { Page } from '@inertiajs/inertia';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/Components/ui/command';

import { Popover, PopoverContent, PopoverTrigger } from '@/Components/ui/popover';
import { Check, ChevronsUpDown } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

interface ProjectSelectorProps{
    selectedProjectId?:string;
    onSelect:(projectId:string)=>void;
    className?:string;
}

const ProjectSelector:FC<ProjectSelectorProps> = ({selectedProjectId,onSelect,className}) => {
    
    const [open,setOpen] = useState(false);
    const {projects} = usePage<Page<PageProps>>().props;
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger className={className} asChild>
                <Button variant="outline" role="combobox" aria-expanded={open} className="w-56 justify-between" >
                    {selectedProjectId ? projects.find((project) => project.id.toString() === selectedProjectId)?.name:"Select project..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56 p-0 max-h-80 overflow-y-auto">
                <Command>
                    <CommandInput placeholder="Search project..." />
                    <CommandEmpty>No project found.</CommandEmpty>
                    <CommandGroup>
                        {projects.map((project) => (
                            <CommandItem key={project.id} value={project.id.toString()} onSelect={(val) =>onSelect(val) } >
                                <Check className={cn("mr-2 h-4 w-4",selectedProjectId === project.id.toString() ? "opacity-100" : "opacity-0")}/>
                                {project.name}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    )
}

export default ProjectSelector