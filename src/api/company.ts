import { TaskForm } from '@/components/compony/add_task/type';
import http, { BaseResponse } from '@/composables/request';
import { Pagination } from '@/types';
import {
    GetV1Company,
    GetV1CompanyInfo,
    V1Contact,
    V1Tasks,
} from '@/types/dto';
import { ComponyForm, ContactForm } from '@/types/form';

const Version = 'v1';

/**
 * @description: 获取公司列表
 * @param {number} per_page
 * @param {number} limit
 * @param {string} company_name
 * @param {number} follow_person_id
 * @return {*}
 */
export async function getApiV1Company(
    per_page?: number,
    limit?: number,
    company_name?: string,
    follow_person_id?: number,
): Promise<BaseResponse<Pagination<GetV1Company>>> {
    return http.get<BaseResponse<Pagination<GetV1Company>>>('/api/v1/company', {
        params: {
            per_page,
            limit,
            company_name,
            follow_person_id,
        },
    });
}

/**
 * @description: 添加公司
 * @param {ComponyForm} form
 * @return {*}
 */
export async function addApiV1Company(
    form: ComponyForm,
): Promise<BaseResponse<GetV1CompanyInfo>> {
    return http.post<BaseResponse<GetV1CompanyInfo>>('/api/v1/company', form);
}

/**
 * @description: 删除公司
 * @return {*}
 */
export async function deleteApiV1Company(
    company_id: number,
): Promise<BaseResponse<GetV1CompanyInfo>> {
    return http.delete<BaseResponse<GetV1CompanyInfo>>(
        `/api/v1/company/${company_id}`,
    );
}

/**
 * @description: 编辑公司信息
 * @param {number} id
 * @param {ComponyForm} form
 * @return {*}
 */
export async function setApiV1Company(
    id: number,
    form: ComponyForm,
): Promise<BaseResponse<GetV1CompanyInfo>> {
    return http.put<BaseResponse<GetV1CompanyInfo>>(
        `/api/v1/company/${id}`,
        form,
    );
}

/**
 * @description: 获取公司详细信息
 * @param {number} id
 * @return {*}
 */
export async function getApiV1CompanyInfo(
    id: number,
): Promise<BaseResponse<GetV1CompanyInfo>> {
    return http.get<BaseResponse<GetV1CompanyInfo>>(`/api/v1/company/${id}`);
}

/**
 * @description: 添加联系人
 * @return {*}
 */
export async function addApiV1CompanyContact(
    company_id: number,
    body: ContactForm,
): Promise<BaseResponse<V1Contact>> {
    return http.post<BaseResponse<V1Contact>>(
        `/api/v1/company/${company_id}/add_contact`,
        body,
    );
}

/**
 * @description: 添加跟进
 * @return {*}
 */
export async function addApiV1CompanyTask(
    company_id: number,
    body: TaskForm,
): Promise<BaseResponse<V1Tasks>> {
    return http.post<BaseResponse<V1Tasks>>(
        `/api/v1/company/${company_id}/add_task`,
        body,
    );
}

/**
 * @description: 编辑跟进信息
 * @return {*}
 */
export async function setApiV1CompanyTask(
    company_id: number,
    task_id: number,
    body: TaskForm,
): Promise<BaseResponse<V1Tasks>> {
    body.task_id = task_id;

    return http.put<BaseResponse<V1Tasks>>(
        `/api/v1/company/${company_id}/set_task`,
        body,
    );
}

/**
 * @description: 批量扭转状态
 * @param {number} task_ids
 * @return {*}
 */
export async function setApiV1CompanyTaskStats(
    company_id: number,
    task_ids: number[],
): Promise<BaseResponse<V1Tasks[]>> {
    return http.put<BaseResponse<V1Tasks[]>>(
        `/api/v1/company/${company_id}/set_task_stats`,
        task_ids,
    );
}
