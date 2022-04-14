import axios, { AxiosInstance } from 'axios';

import { APIResponse, RequestMethod } from 'interfaces/api';

class ApiClient implements RequestMethod {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_HOST,
      timeout: Number(process.env.NEXT_PUBLIC_API_TIMEOUT),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  get<T>(url: string, options?: object): Promise<APIResponse<T>> {
    return this.request<T>(url, 'get', options);
  }

  post<T>(url: string, options?: object): Promise<APIResponse<T>> {
    return this.request<T>(url, 'post', options);
  }

  patch<T>(url: string, options?: object): Promise<APIResponse<T>> {
    return this.request<T>(url, 'patch', options);
  }

  put<T>(url: string, options?: object): Promise<APIResponse<T>> {
    return this.request<T>(url, 'put', options);
  }

  delete<T>(url: string, options?: object): Promise<APIResponse<T>> {
    return this.request<T>(url, 'delete', options);
  }

  async request<T>(url, method, options = {}) {
    try {
      const response = await this.instance.request<APIResponse<T>>({
        ...options,
        url,
        method,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default new ApiClient();
