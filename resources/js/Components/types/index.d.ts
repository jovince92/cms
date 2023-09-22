
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
    total_actual_cost:number;
    date_started:string;
    target_date:string;
    status:string;
    completion_date:string;
    remarks:string;
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