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

  getUserInfo(): Observable<object> {
    return this.getData('/getUserInfo');
  }


  getMenu(): Observable<object> {
    return this.getData('/page/sys-menu/loadMenuByUser');
  }
}
