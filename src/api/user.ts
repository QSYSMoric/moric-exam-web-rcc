import http, { BaseResponse } from '@/composables/request';
import { GetV1UsersList } from '@/types/dto';

const Version = 'v1';

/**
 * @description: 获取用户列表
 * @return {*}
 */
export async function getApiV1UserList(): Promise<
    BaseResponse<GetV1UsersList[]>
> {
    return http.get<BaseResponse<GetV1UsersList[]>>('/api/v1/users/list');
}
