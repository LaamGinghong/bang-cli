import {NgModule} from '@angular/core';
import {NgZorroAntdModule, NZ_I18N, NZ_MESSAGE_CONFIG, NZ_NOTIFICATION_CONFIG, NzMessageConfig, NzNotificationConfig, zh_CN} from 'ng-zorro-antd';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {ApiService} from './service/api.service';
import {CookieService} from './service/cookie.service';
import {CommonMethodsService} from './service/common-methods.service';

const notificationConfig: NzNotificationConfig = {
  nzDuration: 2000,
  nzMaxStack: 3
};
const messageConfig: NzMessageConfig = {
  nzDuration: 3000,
  nzMaxStack: 1
};

@NgModule({
  declarations: [],
  imports: [
    NgZorroAntdModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  exports: [
    NgZorroAntdModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    {provide: NZ_I18N, useValue: zh_CN},
    {provide: NZ_NOTIFICATION_CONFIG, useValue: notificationConfig},
    {provide: NZ_MESSAGE_CONFIG, useValue: messageConfig},
    ApiService,
    CookieService,
    CommonMethodsService
  ],
})
export class ShareModule {
}
