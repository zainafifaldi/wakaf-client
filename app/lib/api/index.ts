import axios, { AxiosInstance } from 'axios';
import EventEmitter from 'eventemitter3';

import { APIResponse, RequestMethod } from 'interfaces/api';

class ApiClient implements RequestMethod {
  private instance: AxiosInstance;
  private storage: Storage = global.localStorage;
  private accessTokenKey: string = 'wakaf_token';
  private isFetchingToken: boolean = false;
  private eventBus = new EventEmitter();

  constructor() {
    this.instance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_HOST,
      timeout: Number(process.env.NEXT_PUBLIC_API_TIMEOUT),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  get<T>(url: string, scope?: string, options?: object): Promise<APIResponse<T>> {
    return this.request<T>(url, 'get', scope, options);
  }

  post<T>(url: string, scope?: string, options?: object): Promise<APIResponse<T>> {
    return this.request<T>(url, 'post', scope, options);
  }

  patch<T>(url: string, scope?: string, options?: object): Promise<APIResponse<T>> {
    return this.request<T>(url, 'patch', scope, options);
  }

  put<T>(url: string, scope?: string, options?: object): Promise<APIResponse<T>> {
    return this.request<T>(url, 'put', scope, options);
  }

  delete<T>(url: string, scope?: string, options?: object): Promise<APIResponse<T>> {
    return this.request<T>(url, 'delete', scope, options);
  }

  async request<T>(url, method, scope, options = {}) {
    try {
      const token = await this.getToken(scope);
      const response = await this.instance.request<APIResponse<T>>({
        ...options,
        url,
        method,
        headers: {
          Authorization: this.isLogin ? `Token ${token}` : `Guest ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async fetchToken() {
    const successEvent = 'ApiClient.tokenLoaded';

    if (this.isFetchingToken) {
      return new Promise((resolve) => {
        this.eventBus.on(successEvent, (response) => {
          resolve(response);
        });
      });
    }

    this.isFetchingToken = true;

    try {
      const { data: response } = await axios.post(`${process.env.NEXT_PUBLIC_API_HOST}/auth/guest_in`);
      this.saveToken(response.data);
      this.eventBus.emit(successEvent, response.data);
      return response.data.token;
    } catch (error) {
      throw error;
    } finally {
      this.isFetchingToken = false;
    }
  }

  getToken(scope) {
    const token = this.token.token;

    if (
      scope.includes('user') &&
      this.isTokenExpired
    ) {
      this.destroyToken();
      window.location.href = '/';
      return Promise.reject('Token is expired');
    }

    if (!this.isServer && !token) {
      return this.fetchToken();
    }

    return Promise.resolve(token);
  }

  get isServer() {
    return typeof window === 'undefined';
  }

  get isLogin() {
    return !!this.token.user_id;
  }

  get isTokenExpired() {
    const expiresIn = this.token.expire_time || 3600;
    const now = Date.now();
    return this.isLogin && new Date(expiresIn).getTime() < now;
  }

  get token() {
    const token = this.storage?.getItem(this.accessTokenKey);
    return JSON.parse(token || '{}');
  }

  saveToken(data: object) {
    this.storage?.setItem(this.accessTokenKey, JSON.stringify(data));
  }

  destroyToken() {
    this.storage?.removeItem(this.accessTokenKey);
  }
}

export default new ApiClient();
