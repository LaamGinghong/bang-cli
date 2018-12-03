import {RouterModule, Routes} from '@angular/router';
import {ContentComponent} from './content.component';
import {NgModule} from '@angular/core';
import {RoutingGuardService} from '../../core/service/routing-guard.service';

const routes: Routes = [{
  path: '',
  component: ContentComponent,
  children: [{
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }, {
    path: 'home',
    loadChildren: './home/home.module#HomeModule',
    // canActivate: [RoutingGuardService]
  }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ContentRoutingModule {
}
