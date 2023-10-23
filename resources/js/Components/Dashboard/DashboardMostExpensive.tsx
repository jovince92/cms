import { cn } from '@/lib/utils';
import React, { FC, useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { useForm } from '@inertiajs/inertia-react';
import { Loader2 } from 'lucide-react';




type Data = {
    rank:number;
    name:string;
    amount:number;
    id:number;
}

interface Props{
    className?:string;
    mostExpensive:Data[];
}

const DashboardMostExpensive:FC<Props> = ({className,mostExpensive}) => {

    

    return (
        <div className={cn('h-full overflow-y-auto relative',className)}>
            <p className='text-right font-bold tracking-tight sticky top-0 z-50 w-full bg-primary-foreground'>Most Expensive Projects</p>
            <div className='relative'>
                <Table>
                    <TableHeader className='sticky top-0 z-50'>
                        <TableRow>
                            <TableHead className="text-left">#</TableHead>
                            <TableHead>Project</TableHead>
                            <TableHead>Actual Cost</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            mostExpensive.map(item=>(
                                <MostExpensiveItems key={item.id} item={item} />
                            ))
                        }
                    </TableBody>
                </Table>
            </div>
            
        </div>
    )
}

export default DashboardMostExpensive;


const MostExpensiveItems:FC<{item:Data}> = ({item}) =>{
    const {get} = useForm();
    const [navigating,setNavigating] = useState(false);
    const navigate = (project_id:number) =>{
        get(route('quotations.index',{
            project_id
        }),{
            onStart:()=>setNavigating(true),
            onFinish:()=>setNavigating(false)
        });
    }
    const {rank,name,amount,id}=item;
    return(
        <TableRow onClick={()=>navigate(id)} role='button'  key={name} className={cn('z-40 relative',
            navigating&&'opacity-60'    
            )}>
            <TableCell className="font-medium">{rank}</TableCell>
            <TableCell className='text-primary font-bold'>{name}</TableCell>
            <TableCell className='text-primary font-bold'>{amount}</TableCell>
        </TableRow>
    );
}