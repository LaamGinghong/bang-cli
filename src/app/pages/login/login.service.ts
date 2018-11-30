import {Injectable} from '@angular/core';
import {ApiService} from '../../share/service/api.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: ApiService
  ) {
  }

  postData(url: string, data?: any): Observable<object> {
    return this.http.setBaseUrl(this.http.apiUrl.pagesApi).post(url, data);
  }

  login(data: object): Observable<object> {
    return this.postData('/page/sys-user/login', data);
  }
}
