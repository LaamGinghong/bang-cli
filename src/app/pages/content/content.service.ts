import {Injectable} from '@angular/core';
import {ApiService} from '../../share/service/api.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  constructor(
    private http: ApiService
  ) {
  }

  getData(url: string, data?: any): Observable<object> {
    return this.http.setBaseUrl(this.http.apiUrl.pagesApi).get(url, data);
  }

  postData(url: string, data?: any): Observable<object> {
    return this.http.setBaseUrl(this.http.apiUrl.pagesApi).post(url, data);
  }

  getMenu(): Observable<object> { // 获取侧边栏菜单
    return this.getData('/page/sys-menu/loadMenuByUser');
  }

  logOut(): Observable<object> { // 登出
    return this.getData('/page/sys-user/loginOut');
  }
}
