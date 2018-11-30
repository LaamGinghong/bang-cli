import {NgModule} from '@angular/core';
import {NgZorroAntdModule, NZ_I18N, zh_CN} from 'ng-zorro-antd';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {ApiService} from './service/api.service';
import {CookieService} from './service/cookie.service';

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
  providers: [{provide: NZ_I18N, useValue: zh_CN}, ApiService, CookieService],
})
export class ShareModule {
}
