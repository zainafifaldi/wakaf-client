import { Pagination } from './common/pagination';

export interface APIMeta extends Pagination {
  http_status: number;
}

export interface APIResponse<T = any> {
  meta: APIMeta;
  notice?: {
    message: string;
  };
  error?: {
    message: string;
  };
  data?: T;
}

export type WrapperParams = [
  url: string,
  scope: string,
  options: object,
];

export interface RequestMethod {
  get<T>(...args: WrapperParams): Promise<APIResponse<T>>;
  post<T>(...args: WrapperParams): Promise<APIResponse<T>>;
  patch<T>(...args: WrapperParams): Promise<APIResponse<T>>;
  put<T>(...args: WrapperParams): Promise<APIResponse<T>>;
  delete<T>(...args: WrapperParams): Promise<APIResponse<T>>;
}
