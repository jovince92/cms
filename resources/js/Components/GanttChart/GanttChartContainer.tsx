import {FC, useMemo} from 'react';
import { Stage } from '../types';
import TimeLine, { Config, Link, Task } from "react-gantt-timeline";

interface Props{
    stages:Stage[];
}

const GanttChartContainer:FC<Props> = ({stages}) => {

    const data:Task[]=useMemo(()=>stages.map(({id,start,end,name})=>({
        id,
        name,
        start:new Date(start),
        end:new Date(end),
    })),[stages]);

    const links:Link[]=useMemo(()=>stages.map((stage,idx,array)=>({id:idx+1,start:stage.id,end:array[idx+1]?array[idx+1].id:0})),[stages]);

    const config:Config={
        taskList:{
            title:{
                label:'Stages',
            },
        },
        dataViewPort:{
            task:{
                showLabel:true,
                style:{
                    backgroundColor:'#075985',
                    color:'white',
                    borderRadius:'1px'
                }
            }
        }
    }
    
    return (
        
        <TimeLine  onHorizonChange={(a,b)=>console.log([a,b])}  data={data} links={links} config={config} />
    )
}

export default GanttChartContainer