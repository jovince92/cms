import { Phase } from '@/Components/types';
import {create} from 'zustand';


interface DeletePhaseModal{
    isOpen?:boolean;
    onOpen:(phase:Phase)=>void;
    onClose:()=>void;
    phase?:Phase;
}



export const useDeletePhaseModal = create<DeletePhaseModal>(set=>({
    phase:undefined,
    onOpen:(phase)=>set({isOpen:true,phase}),
    onClose:()=>set({isOpen:false,phase:undefined})
}));