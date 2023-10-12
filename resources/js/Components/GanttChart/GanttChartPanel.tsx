import {FC, useEffect, useMemo, useState,lazy,Suspense} from 'react';
import { Phase } from '../types';
import { differenceInDays } from 'date-fns';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../ui/select';
//@ts-ignore
import { Gantt, DefaultTheme,MaterialTheme } from "@dhtmlx/trial-react-gantt";



interface GanttChartPanelProps{
    view?:"year"|"month"|"week"|"day",
    data?:any[];
}

type Col={
    label:string;
    name:string;
    align?:'center'|'right'|'left';
    width?:string;
}



const GanttChartPanel:FC<GanttChartPanelProps> = ({view='day',data}) => {
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

    return (
        <div className='w-full'>
            {/* <DefaultTheme>
                <Gantt cellWidth='50' readonly  columns={cols} scales={scales} tasks={data}/>
            </DefaultTheme> */}
        </div>
    )
}

export default GanttChartPanel