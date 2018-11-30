import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, Observer, throwError} from 'rxjs';
import {catchError, mergeMap} from 'rxjs/operators';
import {NzModalService, NzNotificationService} from 'ng-zorro-antd';
import {CookieService} from '../../share/service/cookie.service';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor(
    private notification: NzNotificationService,
    private modal: NzModalService
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      mergeMap((event: any) => {
        if (event instanceof HttpResponse && (!(event.status === 200 && event.body.success))) {
          return Observable.create((observer: Observer<any>) => observer.error(event));
        }
        return Observable.create((observer: Observer<any>) => observer.next(event));
      }),
      catchError((res: HttpResponse<any>) => {
        switch (res.status) {
          case 401:
            break;
          case 200:
            // if (res.body && !res.body.success) {
            //   res.body.errorInfos[0].msg === '用户信息校验失败' ? this.notification.error('用户信息校验失败', '未能获取当前用户搜索条件设置，请确认账号登录成功后再次尝试！') : this.notification.error('失败', res.body.errorInfos[0].msg);
            // }
            if (res.body.errorInfos[0].msg === '请登录后再操作' || res.body.errorInfos[0].msg === '用户登录信息过期') {
              this.modal.create({
                nzWidth: 340,
                nzMaskClosable: false,
                nzTitle: `登录提示`,
                nzContent: `登录超时，请重新登录`,
                nzFooter: [
                  {
                    label: '去登录',
                    shape: 'primary',
                    onClick: () => {
                      this.modal.closeAll();
                      CookieService.delete('WSP_JSESSIONID');
                      window.location.reload();
                    }
                  }
                ]
              });
            } else {
              this.notification.create('error', '失败', res.body.errorInfos[0].msg);
            }
            break;
          case 404:
            console.error(res.status);
            break;
          case 500:
            this.notification.error('失败', '服务异常，请联系管理员！');
            break;
        }
        return throwError(res);
      })
    ) as Observable<HttpEvent<any>>;
  }
}
