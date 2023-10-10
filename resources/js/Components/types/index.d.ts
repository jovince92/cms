import { Address } from './index.d';

import ziggy from 'ziggy-js'

export interface User {
    id: number;
    name:string;
    company_id:string;
    created_at:string;
    updated_at:string;
}

export interface Project{
    id:number;
    name:string;
    description:string;
    location:string;
    manpower:number;
    in_house:number;
    third_party:number;
    date_started:string;
    target_date:string;
    status:ProjectStatusType;
    completion_date?:string;
    remarks?:string;
    created_at:string;
    updated_at:string;
    pictures:Picture[];
    quotations:Quotation[];
}

export interface Picture{
    id:number;
    project_id:string;
    name:string;
    location:string;
    created_at:string;
    updated_at:string;
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
    projects:Project[];
};


export declare global {
    function route(routeName?: string, parameters?: any[] | any, absolute? = true): Function[string]

}


export interface Pagination{
    current_page:number;
    first_page_url:string;
    from:number;
    last_page:number;
    last_page_url:string;
    next_page_url:string;
    path:string;
    per_page:number;
    prev_page_url:string|null;
    to:number;
    total:number
    links:{
        url:string|null;
        label:string;
        active:boolean;
    }[]
}


export interface PaginatedProject extends Pagination{
    data:Project[];
}

export type  ProjectStatusType = "Done"|"Ongoing"|"On-hold"|"Cancelled"|"Not Started"|"Planning";
export type  ModeofPayment = "Cash"|"Check"|"Credit Card"|"Bank Transaction";
export type  QuotationStatus = "Pending"|"Approved"|"Cancelled";

export interface Item{
    id:number;
    quotation_id:number;
    name:string;
    description:string;
    supplier:string;
    estimated_delivery_date:string;
    price:number;
    qty:number;
    total:number;
    mode_of_payment:ModeofPayment;
    created_at:string;
    updated_at:string;
    quotation:Quotation;
}

export interface Quotation{
    id:number;
    project_id:number;
    project:Project;
    requisition_number:string;
    grand_total:number;
    status:QuotationStatus;
    items:Item[];
    created_at:string;
    updated_at:string;
}

export interface Phase{
    id:number;
    project_id:number;
    name:string;
    description:string;
    project:Project;
    stages:Stage[];
    created_at:string;
    updated_at:string;
}


export interface Stage{    
    id:number;
    phase_id:number;
    name:string;
    start:string;
    end:string;
    created_at:string;
    updated_at:string;
}


export interface EmailAddress{
    id:number;
    first_name:string;
    last_name?:string;
    email:string;
    default:1|0;
    created_at:string;
    updated_at:string;
}
