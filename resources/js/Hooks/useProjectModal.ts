import { Project } from '@/Components/types';
import {create} from 'zustand';

type ModalType = "StoreProject"|"DeleteProject";

interface ProjectModal{
    isOpen?:boolean;
    onOpen:(type:ModalType,data?:Project)=>void;
    onClose:()=>void;
    data?:Project;
    type?:ModalType
}


export const useProjectModal = create<ProjectModal>(set=>({
    data:undefined,
    onOpen:(type,data)=>set({isOpen:true,type,data}),
    onClose:()=>set({isOpen:false,data:undefined})
}));