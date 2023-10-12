import React, { useRef,FC, useEffect, useMemo } from 'react';
import { Task, gantt } from 'dhtmlx-gantt';
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css';

interface GanttProps{
    phases: {
        tasks:Task[];
    }
}

const Gantt:FC<GanttProps> = ({phases}) => {
  // Use useRef to create a reference to the gantt container div
    const ganttContainer = useRef<HTMLDivElement>(null);
    // Use useEffect to initialize and parse the gantt chart


    


    useEffect(() => {
        gantt.clearAll();
        gantt.config.date_format = '%Y-%m-%d';
        gantt.templates.parse_date = function(date) { 
            return new Date(date);
        };
        gantt.templates.format_date = function(date) { 
            return date.toISOString();
        };
        gantt.config.columns=[
            {label:'Phase',name:'text',width:150,tree:true},
            {label:'Start',name:'start_date',align:'center'},
            {label:'End',name:'end_date',align:'center'},
            {label:'Days',name:'duration',align:'right'}
        ];
        gantt.config.scales=[
            { unit: "month", step: 1, format: "%F, %Y" },
            { unit: 'week', step: 1,format: "%d" },
        ];
        //@ts-ignore
        gantt.init(ganttContainer.current);
        gantt.parse(phases);
    }, []);

    // Return the gantt container div
    return (
        <div
            ref={ganttContainer}
            style={{ width: '100%', height: '100%' }}
        ></div>
    );
};


export default Gantt