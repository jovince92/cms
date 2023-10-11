import {FC, useEffect, useState} from 'react';
import { Phase } from '../types';
import { differenceInDays } from 'date-fns';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../ui/select';
import GanttChartContainer from './GanttChartContainer';
interface GanttChartPanelProps{
    phases:Phase[];
}



const GanttChartPanel:FC<GanttChartPanelProps> = ({phases}) => {
    
    

    return (
        <div className='flex flex-col h-full space-y-2.5'>
            {
                phases.map(phase=>(
                    <div key={phase.id}>
                        <div className='bg-secondary w-full p-2.5 rounded-t flex flex-col space-y-1.5 md:space-y-0 md:flex-row md:items-center md:justify-between'>
                            <span>{phase.name}</span>
                            <div>
                                VIEW MODE CHANGER GOES HERE
                            </div>
                        </div>
                        <div className='w-full flex-1 overflow-auto'>
                            <GanttChartContainer stages={phase.stages} />
                        </div>
                    </div>
                ))
            }
            
        </div>
    )
}

export default GanttChartPanel