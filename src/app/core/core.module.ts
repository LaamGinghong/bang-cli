import {APP_INITIALIZER, NgModule, Optional, Provider, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StartUpService} from './service/start-up.service';
import {CoreService} from './service/core.service';
import {NET_SERVICES} from './service';
import {HttpClientModule} from '@angular/common/http';
import {RouteReuseStrategy} from '@angular/router';
import {CommonRouteReuse} from './common-route-reuse';

export function configFactory(config: StartUpService): Function {
  return () => config.load();
}

const providers: Provider = [
  CoreService,
  NET_SERVICES,
  {provide: APP_INITIALIZER, useFactory: configFactory, deps: [StartUpService], multi: true},
  {provide: RouteReuseStrategy, useClass: CommonRouteReuse}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers
})
export class CoreModule {
  constructor(
    @Optional()
    @SkipSelf()
      parentModule: CoreModule
  ) {
    if (parentModule) {
      throw new Error('核心模块CoreModule已经引入，只允许在根模块内导入核心模块');
    }
  }
}
