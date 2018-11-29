import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChangePasswordComponent} from './change-password.component';
import {ChangePasswordRoutingModule} from './change-password-routing.module';
import {ShareModule} from '../../share/share.module';

@NgModule({
  declarations: [ChangePasswordComponent],
  imports: [
    CommonModule,
    ChangePasswordRoutingModule,
    ShareModule
  ]
})
export class ChangePasswordModule {
}
