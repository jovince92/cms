import {FC, useEffect, useState} from 'react';
import { Phase } from '../types';
import { differenceInDays } from 'date-fns';
import { Gantt, Task, EventOption, StylingOption, ViewMode, DisplayOption } from 'gantt-task-react';
import "gantt-task-react/dist/index.css";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../ui/select';
interface GanttChartPanelProps{
    phases:Phase[];
}



const GanttChartPanel:FC<GanttChartPanelProps> = ({phases}) => {
    const [mode,setMode]=useState<ViewMode>(ViewMode.Week);
    const stages:Task[] = phases[0].stages.map(stage=>({
        start:new Date(stage.start),
        end:new Date(stage.end),
        name:stage.name,
        id:stage.id.toString(),
        type:'task',
        progress:0,
        isDisabled: true,
        project:phases[0].name,
    }));

    return (
        <div className='flex flex-col '>
            <div className='bg-secondary w-full p-2.5 rounded-t flex flex-col space-y-1.5 md:space-y-0 md:flex-row md:items-center md:justify-between'>
                <span>{phases[0].name}</span>
                <div>
                    <Select onValueChange={(val:ViewMode)=>setMode(val)}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select View Mode" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>View Mode</SelectLabel>
                                <SelectItem value={ViewMode.Day}>{ViewMode.Day}</SelectItem>
                                <SelectItem value={ViewMode.Month}>{ViewMode.Month}</SelectItem>
                                <SelectItem value={ViewMode.Week}>{ViewMode.Week}</SelectItem>
                                <SelectItem value={ViewMode.Year}>{ViewMode.Year}</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div className='w-full flex-1 overflow-auto'>
                <Gantt 
                    fontSize='13'
                    barFill={80}
                    preStepsCount={0} 
                    viewMode={mode} 
                    tasks={stages} />
            </div>
        </div>
    )
}

export default GanttChartPanel