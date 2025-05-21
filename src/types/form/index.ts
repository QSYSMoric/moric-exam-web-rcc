export interface ComponyForm {
    name: string;
    phone?: string;
    address?: string;
    post_code?: string;
    follow_person_id: number;
}

export interface ContactForm {
    name: string;
    phones: string[];
    gender: '男' | '女';
    email: string;
    remark: string;
    telephone: string;
    importance: string;
    department: string;
}
