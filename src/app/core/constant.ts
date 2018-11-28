import {environment} from '../../environments/environment';
import {HttpHeaders, HttpParams} from '@angular/common/http';

/* 环境配置 */
export const ENVIRONMENT = environment;

/* 接口配置 */
export const API_ROOT = environment.api;

/* 配置头部信息 */
export const HTTP_OPTIONS: {
  headers?: HttpHeaders,
  params?: HttpParams,
  responseType?: 'json',
  withCredentials?: boolean
} = {
  withCredentials: true
};
