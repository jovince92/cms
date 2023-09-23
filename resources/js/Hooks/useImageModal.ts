import { Project } from '@/Components/types';
import {create} from 'zustand';


interface ImageModal{
    isOpen?:boolean;
    project?:Project;
    onOpen:(project:Project)=>void;
    onClose:()=>void;
}


export const useImageModal = create<ImageModal>(set=>({
    onOpen:(project)=>set({isOpen:true,project}),
    onClose:()=>set({isOpen:false,project:undefined})
}));