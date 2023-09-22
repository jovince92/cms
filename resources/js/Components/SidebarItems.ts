import {LucideIcon,Gauge,Building,PictureInPicture2,BarChart3,Boxes,Users2,Settings} from 'lucide-react'

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
    icon:BarChart3,
    label:'Gantt chart',
    routeName:'gantt_chart.index'
},
{
    icon:Boxes,
    label:'Quotation',
    routeName:'quotations.index'
},
{
    icon:Users2,
    label:'Accounts',
    routeName:'accounts.index'
},
{
    icon:Settings,
    label:'Settings',
    routeName:'settings.index'
},
]