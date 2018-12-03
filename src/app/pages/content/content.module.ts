import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ContentComponent} from './content.component';
import {ContentRoutingModule} from './content-routing.module';
import {ShareModule} from '../../share/share.module';

@NgModule({
  declarations: [ContentComponent],
  imports: [
    CommonModule,
    ContentRoutingModule,
    ShareModule
  ]
})
export class ContentModule {
}
