import {RouterModule, Routes} from '@angular/router';
import {ContentComponent} from './content.component';
import {NgModule} from '@angular/core';

const routes: Routes = [{
  path: '',
  component: ContentComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ContentRoutingModule {
}
