import { ButtonHTMLAttributes, FC, forwardRef } from 'react';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { ChevronsUpDown } from 'lucide-react';

const ProjectHeader:FC<ButtonHTMLAttributes<HTMLButtonElement>> = forwardRef(({children,className,...props},ref) => {
    return (
        <Button className={cn('group whitespace-nowrap',className)} variant='ghost' {...props} size='sm'>
            {children} 
            <ChevronsUpDown className='opacity-30 group-hover:opacity-100 transition ml-1.5 h-4 w-4'/>
        </Button>
    )
});

export default ProjectHeader