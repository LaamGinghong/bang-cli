import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {HTTP_OPTIONS} from '../../core/constant';
import {CustomQueryEncoderHelper} from './custom-query-encoder-helper';
import {ApiUrl} from '../../core/api-url';
import {ConfigService} from '../../core/service/config.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl = '';
  apiUrl: ApiUrl;

  constructor(
    private http: HttpClient,
    private config: ConfigService
  ) {
    this.apiUrl = this.config.load();
  }

  static setOptions(option: {
    headers?: HttpHeaders,
    params?: HttpParams,
    responseType?: 'json';
    withCredentials?: boolean;
  }): object {
    const _default = HTTP_OPTIONS ? {...HTTP_OPTIONS} : {};
    return option ? Object.assign({}, _default, option) : _default;
  }

  static setParams(params: any): HttpParams {
    return new HttpParams({
      encoder: new CustomQueryEncoderHelper(),
      fromObject: params
    });
  }

  setBaseUrl(url: string): ApiService {
    this.baseUrl = url;
    return this;
  }

  /**
   * get请求
   * url 必填
   * body 查询参数 选填
   * options 请求头 选填
   */
  get(url: string, body?: any, options?: {
    headers?: HttpHeaders,
    params?: HttpParams,
    responseType?: 'json',
    withCredentials?: boolean
  }): Observable<object> {
    let option = ApiService.setOptions(options);
    const params = ApiService.setParams(body);
    option = Object.assign(option, {
      params
    });
    return this.http.get(this.getFullUrl(url), option);
  }

  /**
   * post请求
   * url 必填
   * body 查询参数 选填
   * options 请求头 选填
   */
  post(url: string, body?: any, options?: {
    headers?: HttpHeaders,
    params?: HttpParams,
    responseType?: 'json',
    withCredentials?: boolean
  }): Observable<object> {
    const option = ApiService.setOptions(options);
    return this.http.post(this.getFullUrl(url), body ? body : {}, option);
  }

  getFullUrl(url: string): string {
    return this.baseUrl + url;
  }
}
