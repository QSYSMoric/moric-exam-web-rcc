import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

class HttpRequest {
    private instance: AxiosInstance;

    constructor() {
        this.instance = axios.create(this.getInsideConfig());
        this.interceptors(this.instance);
    }

    private getInsideConfig(): AxiosRequestConfig {
        return {
            timeout: 80000,
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
                // 'X-Requested-With': 'XMLHttpRequest',
            },
        };
    }

    private interceptors(instance: AxiosInstance) {
        instance.interceptors.request.use(
            (config) => {
                // 请求前处理（如添加token）
                // const token = localStorage.getItem('token');
                // if (token) {
                //   config.headers.Authorization = `Bearer ${token}`;
                // }
                return config;
            },
            (error) => {
                return Promise.reject(error);
            },
        );

        instance.interceptors.response.use(
            (response: AxiosResponse) => {
                // 响应数据处理
                const { data } = response;
                return data;
            },
            (error) => {
                // 统一错误处理
                if (error.response) {
                    switch (error.response.status) {
                        case 401:
                            // 处理未授权
                            break;
                        case 404:
                            // 处理未找到
                            break;
                        case 500:
                            // 处理服务器错误
                            break;
                    }
                }
                return Promise.reject(error);
            },
        );
    }

    public get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
        return this.instance.get(url, config);
    }

    public post<T = any>(
        url: string,
        data?: any,
        config?: AxiosRequestConfig,
    ): Promise<T> {
        return this.instance.post(url, data, config);
    }

    public put<T = any>(
        url: string,
        data?: any,
        config?: AxiosRequestConfig,
    ): Promise<T> {
        return this.instance.put(url, data, config);
    }

    public delete<T = any>(
        url: string,
        config?: AxiosRequestConfig,
    ): Promise<T> {
        return this.instance.delete(url, config);
    }

    public request<T = any>(config: AxiosRequestConfig): Promise<T> {
        return this.instance.request(config);
    }
}

const http = new HttpRequest();

// 使用示例：
// http.get<BaseResponse<User>>('/api/user/1').then(res => {...})
// http.post<BaseResponse<boolean>>('/api/user', {name: 'test'})

export default http;

// 响应类型
export interface BaseResponse<T = any> {
    code: number;
    data: T;
    message: string;
    [key: string]: any;
}
