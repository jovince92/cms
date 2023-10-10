import { EmailAddress } from '@/Components/types';
import {create} from 'zustand';

type ModalType = "StoreAddress"|"DeleteAddress";

interface AddressModal{
    isOpen?:boolean;
    onOpen:(type:ModalType,data?:EmailAddress)=>void;
    onClose:()=>void;
    data?:EmailAddress;
    type?:ModalType
}


export const useAddressModal = create<AddressModal>(set=>({
    data:undefined,
    onOpen:(type,data)=>set({isOpen:true,type,data}),
    onClose:()=>set({isOpen:false,data:undefined})
}));