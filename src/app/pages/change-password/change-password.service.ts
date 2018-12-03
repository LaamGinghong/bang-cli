import {Injectable} from '@angular/core';
import {ApiService} from '../../share/service/api.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChangePasswordService {

  constructor(
    private http: ApiService
  ) {
  }

  getData(url: string, data?: any): Observable<object> {
    return this.http.setBaseUrl(this.http.apiUrl.pagesApi).get(url, data);
  }

  changePassword(value: object): Observable<object> {
    return this.getData('/page/sys-user/changPwd', value);
  }
}
