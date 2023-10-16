import { User } from '@/Components/types';
import {create} from 'zustand';

type ModalType = "StoreAccount"|"DeleteAccount";

interface AccountModal{
    isOpen?:boolean;
    onOpen:(type:ModalType,data?:User)=>void;
    onClose:()=>void;
    data?:User;
    type?:ModalType
}


export const useAccountModal = create<AccountModal>(set=>({
    data:undefined,
    onOpen:(type,data)=>set({isOpen:true,type,data}),
    onClose:()=>set({isOpen:false,data:undefined})
}));