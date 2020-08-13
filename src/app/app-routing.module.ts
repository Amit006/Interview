import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageNotFoundComponentComponent} from './page-not-found-component/page-not-found-component.component'
import {HomeComponent} from './home/home.component';
import {SidebarComponent} from './admin/Component/sidebar/sidebar.component';
import {LoginComponent} from './admin/Component/login/login.component';
import {DashboardComponent} from './admin/Component/dashboard/dashboard.component';

const routes: Routes = [
  { path: '',  component: HomeComponent, pathMatch: 'full' },
  { path: 'AdminLogin',  component: LoginComponent , pathMatch: 'full',
  },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
  { path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule) },
  { path: '**', component: PageNotFoundComponentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true, enableTracing: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
