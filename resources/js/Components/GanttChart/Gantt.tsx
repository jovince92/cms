import React, { useRef,FC, useEffect, useMemo } from 'react';
import { Task, ZoomMethods, gantt } from 'dhtmlx-gantt';
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css';
import { Button } from '../ui/button';
import ActionTooltip from '../ActionTooltip';
import { format } from 'date-fns';

interface GanttProps{
    viewMode?:'month'|'year'|'day'|'week';
    phases: {
        tasks:Task[];
    },
    projectName:string;
}

const Gantt:FC<GanttProps> = ({phases,viewMode='week',projectName}) => {
  // Use useRef to create a reference to the gantt container div
    const ganttContainer = useRef<HTMLDivElement>(null);
    // Use useEffect to initialize and parse the gantt chart


    


    useEffect(() => {
        gantt.clearAll();
        gantt.config.date_format = '%Y-%m-%d';
        gantt.config.resize_rows = true;
        gantt.config.grid_resize = true;
        gantt.config.scale_height = 60;
        
        gantt.plugins({
            export_api: true,
            tooltip: true 
        });
        gantt.templates.grid_header_class = colName => `!text-primary !font-bold !tracking-tight ${colName==='duration'&&'!text-right !pr-1.5'}`;
        gantt.templates.grid_row_class = () =>`!text-primary`
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
            {label:'Days',name:'duration',align:'right',width:50},
            
        ];
        gantt.config.scales=[
            { unit: "month", step: 1, format: "%Y - %F" },
            { unit: viewMode, step: 1,format: "%d" },
        ];

        gantt.templates.tooltip_text = (start,end,task) =>(
            `<div className='!bg-background !text-primary'>
                <p><b>${task.text}</b></p>
                <p><b>Start Date: ${format(start,'PP')}</b></p>
                <p><b>End Date: ${format(end,'PP')}</b></p>
            </div>`
        );
        

        //@ts-ignore
        gantt.init(ganttContainer.current);
        gantt.parse(phases);
    }, [viewMode,phases]);

    const saveToSheet = () => gantt.exportToExcel({
        visual: "base-colors",
        cellColors: true,
        name:`${projectName.replace(/ /g, "_")}.xlsx`
    });

    // Return the gantt container div
    return (
        <div className='h-full w-full relative'>
            <div ref={ganttContainer} style={{ width: '100%', height: '100%' }} />
            <button  onClick={saveToSheet} className='absolute top-[1.1rem] left-2.5 aspect-square bg-transparent' >
                <ActionTooltip label='Export To XLSX'>
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="28" height="28" viewBox="0 0 48 48">
                        <rect width="16" height="9" x="28" y="15" fill="#21a366"></rect><path fill="#185c37" d="M44,24H12v16c0,1.105,0.895,2,2,2h28c1.105,0,2-0.895,2-2V24z"></path><rect width="16" height="9" x="28" y="24" fill="#107c42"></rect><rect width="16" height="9" x="12" y="15" fill="#3fa071"></rect><path fill="#33c481" d="M42,6H28v9h16V8C44,6.895,43.105,6,42,6z"></path><path fill="#21a366" d="M14,6h14v9H12V8C12,6.895,12.895,6,14,6z"></path><path d="M22.319,13H12v24h10.319C24.352,37,26,35.352,26,33.319V16.681C26,14.648,24.352,13,22.319,13z" opacity=".05"></path><path d="M22.213,36H12V13.333h10.213c1.724,0,3.121,1.397,3.121,3.121v16.425	C25.333,34.603,23.936,36,22.213,36z" opacity=".07"></path><path d="M22.106,35H12V13.667h10.106c1.414,0,2.56,1.146,2.56,2.56V32.44C24.667,33.854,23.52,35,22.106,35z" opacity=".09"></path><linearGradient id="flEJnwg7q~uKUdkX0KCyBa_UECmBSgBOvPT_gr1" x1="4.725" x2="23.055" y1="14.725" y2="33.055" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#18884f"></stop><stop offset="1" stopColor="#0b6731"></stop></linearGradient><path fill="url(#flEJnwg7q~uKUdkX0KCyBa_UECmBSgBOvPT_gr1)" d="M22,34H6c-1.105,0-2-0.895-2-2V16c0-1.105,0.895-2,2-2h16c1.105,0,2,0.895,2,2v16	C24,33.105,23.105,34,22,34z"></path><path fill="#fff" d="M9.807,19h2.386l1.936,3.754L16.175,19h2.229l-3.071,5l3.141,5h-2.351l-2.11-3.93L11.912,29H9.526	l3.193-5.018L9.807,19z"></path>
                    </svg>
                </ActionTooltip>
            </button>
        </div>
    );
};


export default Gantt