import {Provider} from '@angular/core';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {HttpInterceptorService} from './http-interceptor.service';
import {ConfigService} from './config.service';

export const NET_SERVICES: Provider = [
  ConfigService,
  HttpInterceptorService,
  {
    provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true
  }];
