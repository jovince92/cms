import {FC} from 'react'
import { Phase } from '../types';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';

interface PhaseAccordionContentProps{
    phase:Phase;
}

const PhaseAccordionContent:FC<PhaseAccordionContentProps> = ({phase}) => {
    const {stages} = phase;
    
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className='min-w-[10rem]'>Stage</TableHead>
                    <TableHead className='min-w-[5rem]'>No. of Days</TableHead>
                    <TableHead className='min-w-[10rem]'>Start Date</TableHead>
                    <TableHead className='min-w-[10rem]'>End Date</TableHead>
                    <TableHead className='text-right'>Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableCell className="font-medium" >INV001</TableCell>
                    <TableCell>Paid</TableCell>
                    <TableCell>Credit Card</TableCell>
                    <TableCell>$250.00</TableCell>
                    
                    <TableCell className='text-right'>$250.00</TableCell>
                </TableRow>
                <TableRow>
                    
                    <TableCell className='flex justify-center items-center w-full' colSpan={5}>
                        <p> Add Stage</p>
                    </TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                </TableRow>
            </TableBody>
        </Table>
    )
}

export default PhaseAccordionContent