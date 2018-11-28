import {NgModule} from '@angular/core';
import {NgZorroAntdModule, NZ_I18N, zh_CN} from 'ng-zorro-antd';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [
    NgZorroAntdModule,
    FormsModule,
    HttpClientModule
  ],
  exports: [
    NgZorroAntdModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [{provide: NZ_I18N, useValue: zh_CN}],
})
export class ShareModule {
}
