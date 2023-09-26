import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table";
import { ItemType } from "../QuotationModal";
import { Button } from "@/Components/ui/button";
import { Trash2 } from "lucide-react";
import { FC } from "react";

interface QuotationListProps{
    items:ItemType[];
    onDelete:(name:string)=>void;
}

const QuotationList:FC<QuotationListProps> = ({items,onDelete}) =>{
    return(
        <div className='max-w-[90vw]'>
            <Table className=''>
                <TableHeader className=''>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Supplier</TableHead>
                        <TableHead>Estimated Delivery Date</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Total Price</TableHead>
                        <TableHead>Mode of Payment</TableHead>
                        <TableHead>Remove</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        (items||[]).map(item=>(
                            <TableRow key={item.name}>
                                <TableCell className="font-medium">{item.name}</TableCell>
                                <TableCell>{item.description}</TableCell>
                                <TableCell>{item.supplier}</TableCell>
                                <TableCell>{item.estimated_delivery_date}</TableCell>
                                <TableCell>{item.price}</TableCell>
                                <TableCell>{item.qty}</TableCell>
                                <TableCell>{(!item.qty||!item.price)?'0':(item.qty*item.price).toString()}</TableCell>
                                <TableCell>{item.mode_of_payment}</TableCell>
                                <TableCell> <Button onClick={()=>onDelete(item.name)} size='sm' variant='destructive'> <Trash2 className='w-4 h-4' /> </Button> </TableCell>
                            </TableRow>
                        ))
                    }
                    
                </TableBody>
            </Table>
        </div>
    );
}

export default QuotationList;