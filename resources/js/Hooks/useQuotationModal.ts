import { Project,Picture } from '@/Components/types';
import {create} from 'zustand';

type ModalType="UploadImage"|"DeleteImage";
type ModalData = {
    project?:Project;
    picture?:Picture
}

interface QuotationModal{
    isOpen?:boolean;
    data?:ModalData;
    onOpen:(type:ModalType,data:ModalData)=>void;
    onClose:()=>void;
    type?:ModalType;
}
    


export const useQuotationModal = create<QuotationModal>(set=>({
    type:undefined,
    onOpen:(type,data)=>set({isOpen:true,data,type}),
    onClose:()=>set({isOpen:false,data:undefined,type:undefined})
}));