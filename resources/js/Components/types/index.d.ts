
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
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
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

export type  ProjectStatusType = 
    "Done"|
    "Ongoing"|
    "On-hold"|
    "Cancelled"|
    "Not Started"|
    "Planning"
