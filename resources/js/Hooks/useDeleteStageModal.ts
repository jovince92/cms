import { Stage } from '@/Components/types';
import {create} from 'zustand';


interface DeleteStageModal{
    isOpen?:boolean;
    onOpen:(stage:Stage)=>void;
    onClose:()=>void;
    stage?:Stage;
}



export const useDeleteStageModal = create<DeleteStageModal>(set=>({
    stage:undefined,
    onOpen:(stage)=>set({isOpen:true,stage}),
    onClose:()=>set({isOpen:false,stage:undefined})
}));