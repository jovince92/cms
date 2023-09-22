import  { FC } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import {CalendarIcon} from 'lucide-react';
import { format } from 'date-fns';
import { Calendar } from './ui/calendar';

interface DatePickerProps{
    date:string;
    setDate:(e?:string)=>void;
}

const DatePicker:FC<DatePickerProps> = ({date,setDate}) => {
    return (
        <>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        //onClick={()=>setOpen(open)}
                        type='button'
                        variant={"outline"}
                        className={cn(
                            "justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                        )}
                        >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(new Date(date), "PPP") : <span>Pick a date</span>}
                    </Button>
                </PopoverTrigger>
            
                <PopoverContent role='alertdialog' style={{ zIndex:100000 }}>
                    <Calendar  style={{ zIndex:100000 }}
                        mode="single"
                        selected={new Date(date)}
                        onSelect={(e)=>setDate(e?.toString())}
                        initialFocus
                    />
                </PopoverContent>
            </Popover>
        </>
    )
}

export default DatePicker