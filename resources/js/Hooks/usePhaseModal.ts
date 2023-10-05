import { Project } from '@/Components/types';
import {create} from 'zustand';


interface PhaseModal{
    isOpen?:boolean;
    onOpen:(p:Project)=>void;
    onClose:()=>void;
    project?:Project;
}



export const usePhaseModal = create<PhaseModal>(set=>({
    project:undefined,
    onOpen:(project)=>set({isOpen:true,project}),
    onClose:()=>set({isOpen:false,project:undefined})
}));