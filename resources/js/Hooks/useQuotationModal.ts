import { Project, Quotation } from '@/Components/types';
import {create} from 'zustand';

type ModalType="StoreQuotation"|"CancelQuotation"|"ApproveQuotation"|"RequestQuotation";
type ModalData = {
    project?:Project;
    quotation?:Quotation;
    itemsCount?:number;
}

interface QuotationModal{
    isOpen?:boolean;
    data?:ModalData;
    onOpen:(type:ModalType,data:ModalData)=>void;
    onClose:()=>void;
    type?:ModalType;
    emailMsg?:string;
    emailSubject?:string;
}
    


export const useQuotationModal = create<QuotationModal>(set=>({
    data:undefined,
    emailMsg:undefined,
    type:undefined,
    onOpen:(type,data)=>set({
        isOpen:true,
        data,type,
        emailMsg:type==='RequestQuotation'?
            generateEmail(data?.quotation):
            undefined,
        emailSubject:type==='RequestQuotation'?
            generateSubject(data?.quotation):
            undefined,
    }),
    onClose:()=>set({
        isOpen:false,
        data:undefined,
        type:undefined,
        emailMsg:undefined,
        emailSubject:undefined
    })
}));

const generateEmail = (quotation?:Quotation):string=>{
    if(!quotation) return "";
    const {items} = quotation;
    let itemContents = items.reduce((prev,item)=>prev+`
    <tr>
        <td>${item.name}</td>
        <td>${item.estimated_delivery_date}</td>
        <td>${item.supplier}</td>
        <td>${new Intl.NumberFormat().format(item.price).toString()}</td>
        <td>${item.qty}</td>
        <td>${item.mode_of_payment}</td>
        <td>${new Intl.NumberFormat().format(item.total).toString()}</td>
    </tr>
    `,"");

    itemContents=itemContents+`
        <tr>
            <td colspan="4">
            <td colspan="2">
                <strong>Grand Total</strong>
            </td>
            <td>
                <strong> ${new Intl.NumberFormat().format(quotation.grand_total).toString()}</strong>
            </td>
        </tr>
    `;

    return `

    
    Hi Sir Jerry/Ma'am Ann,
    <br>
    <br>
    May I ask approval to purchase the items in this request.
    <br>
    <br>
    Project:&nbsp;<strong>${quotation.project.name}</strong><br>
    Requisition#:&nbsp;<strong>${quotation.requisition_number}</strong>
    
    <table>
        <thead>
            <tr align='center'>
                <th>Item</th>
                <th>Estimated Delivery</th>
                <th>Supplier</th>
                <th>Price</th>
                <th>Quantiy</th>
                
                <th>Mode Of Payment</th>
                <th>Total Price</th>
            </tr>
        </thead>
        <tbody>
            ${itemContents}
        </tbody>
    </table>
    <br><br>
    This is the lowest Quote we can found from the suppliers
    <br>
    Please advise.
    <br><br>
    Thanks.
    <br><b></b><br>
    
    
    `;
}

const generateSubject = (quotation?:Quotation):string =>{
    if(!quotation) return "";
    const title = `${quotation.project.name.replace(' ','_')}_${quotation.requisition_number}`
    return `Quotation For Approval - ${title}`
}