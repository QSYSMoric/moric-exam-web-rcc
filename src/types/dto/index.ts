export interface GetV1Company {
    id: number;
    name: string;
    phone?: string;
    address?: string;
    post_code?: string;
    created_at: string;
    updated_at: string;
    follow_person_id: number;
    follow_person?: {
        id: number;
        name: string;
    };
}

export interface GetV1UsersList {
    id: number;
    name: string;
}

export interface V1Contact {
    id: number;
    name: string;
    gender: string;
    importance: string;
    department?: string;
    masked_phones: string[];
    telephone?: string;
    email: string;
    remark?: string;
    company_id: number;
}

export interface V1Tasks {
    id: number;
    time: string;
    remark: string;
    stage: string;
    state: 0 | 1;
    company_id: number;
    contact_id: number;
    user_id: number;
    contact_information: string;
    create_at: string;
}

export interface GetV1CompanyInfo {
    id: number;
    name: string;
    phone?: string;
    address?: string;
    post_code?: string;
    created_at: string;
    updated_at: string;
    follow_person_id: number;
    contacts: V1Contact[];
    tasks: V1Tasks[];
    follow_person?: {
        id: number;
        name: string;
    };
}
