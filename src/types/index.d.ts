import type { App } from 'vue';
export type UserModule = (app: App) => void;

// 分页参数
interface PageParams {
    pageNum: number;
    pageSize: number;
    keyword?: string;
}

interface Pagination<T> {
    current_page: number;
    total_pages: number;
    total_count: number;
    per_page: number;
    rows: T[];
}

// 正常响应
interface BaseResponse<T> {
    code: number;
    data: T;
    message: string;
    time: number;
}

// 列表数据
interface ListData<T> {
    list: T[];
    total: number;
}
