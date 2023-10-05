import {LucideIcon,Gauge,Building,PictureInPicture2,BarChart3,Percent,Users2,SendToBack} from 'lucide-react'

type SideBarItem={
    icon:LucideIcon;
    label:string;
    routeName:string;
}


export const SideBarItems:SideBarItem[] =[
{
    icon:Gauge,
    label:'Dashboard',
    routeName:'dashboard'
},
{
    icon:Building,
    label:'Projects',
    routeName:'projects.index'
},
{
    icon:PictureInPicture2,
    label:'Pictures',
    routeName:'pictures.index'
},
{
    icon:Percent,
    label:'Quotation',
    routeName:'quotations.index'
},
{
    icon:SendToBack,
    label:'Phases',
    routeName:'phases.index'
},
{

    icon:BarChart3,
    label:'Gantt chart',
    routeName:'gantt_chart.index'
},
{
    icon:Users2,
    label:'Accounts',
    routeName:'accounts.index'
},
]