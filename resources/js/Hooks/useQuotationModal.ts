import { Project,Picture, Quotation } from '@/Components/types';
import {create} from 'zustand';

type ModalType="StoreQuotation"|"DeleteQuotation";
type ModalData = {
    project?:Project;
    quotation?:Quotation;
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