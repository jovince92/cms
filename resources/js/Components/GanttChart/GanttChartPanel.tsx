import {FC, useEffect, useMemo, useState} from 'react';
import { Phase } from '../types';
import { differenceInDays } from 'date-fns';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../ui/select';
//@ts-ignore
import { Gantt, DefaultTheme } from "@dhtmlx/trial-react-gantt";
interface GanttChartPanelProps{
    phases:Phase[];
    view?:"year"|"month"|"week"|"day"
}

type Col={
    label:string;
    name:string;
    align?:'center'|'right'|'left';
    width?:string;
}

type Data = {
    id:number;
    open?:boolean;
    parent:number;
    start_date:string|Date;
    text:string;
    duration:number;
    progress:100;
    type?:"task"|"project"| "milestone";
}

const GanttChartPanel:FC<GanttChartPanelProps> = ({phases,view='week'}) => {

    const scales = [
        { unit: "month", step: 1, format: "MMM-yy" },
        { unit: view, step: 1,format: "d" },
    ];

    const cols:Col[]=[
        {label:'Phase',name:'text',width:'7rem'},
        {label:'Start',name:'start',align:'center'},
        {label:'End',name:'end',align:'center'},
        {label:'Days',name:'duration',align:'left'}
    ];

    

    const chartData:Data[]=useMemo(()=>{
        let data:Data[]=[];
        phases.forEach(phase => {
            const {stages} = phase;
            const parentId=phase.id*-1;
            data.push({
                id:parentId,
                open:true,
                parent:0,
                start_date:new Date(stages[0].start),
                duration:differenceInDays(new Date(stages[stages.length-1].end),new Date(stages[0].start)),
                text:phase.name,
                progress:100,            
                type: "project",
            });
            stages.forEach(stage=>{
                data.push({
                    id:stage.id,
                    open:false,
                    parent:parentId,
                    start_date: new Date(stage.start),
                    duration:differenceInDays(new Date(stage.end),new Date(stage.start)),
                    text:stage.name,
                    progress:100,
                    //type:"project"
                });
            });
        });
        return data;
    },[phases]);

    if(!chartData){
        return null;
    }

    return (
        <div className='flex flex-col h-full space-y-2.5 w-full items-stretch justify-stretch'>
            <DefaultTheme>
                <Gantt readonly  columns={cols} scales={scales} tasks={chartData}/>
            </DefaultTheme>
            
        </div>
    )
}

export default GanttChartPanel