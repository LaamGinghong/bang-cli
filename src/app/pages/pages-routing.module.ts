import {RouterModule, Routes} from '@angular/router';
import {PagesComponent} from './pages.component';
import {NgModule} from '@angular/core';

const routes: Routes = [{
  path: 'pages',
  component: PagesComponent,
  children: [{
    path: '',
    redirectTo: 'content',
    pathMatch: 'full'
  }, {
    path: 'content',
    loadChildren: './content/content.module#ContentModule'
  }, {
    path: 'login',
    loadChildren: './login/login.module#LoginModule',
    data: {clear: true}
  }, {
    path: 'change_password',
    loadChildren: './change-password/change-password.module#ChangePasswordModule',
    data: {clear: true}
  }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class PagesRoutingModule {
}
