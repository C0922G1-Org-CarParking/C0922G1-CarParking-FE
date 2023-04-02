import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CustomerListComponent} from './customer-list/customer-list.component';
import {CustomerUpdateComponent} from './customer-update/customer-update.component';
import {AdminGuard} from '../security-authentication/security-auth/admin.guard';
import {UserGuard} from '../security-authentication/security-auth/user.guard';


const routes: Routes = [
  {
    path: 'list',
    component: CustomerListComponent,  canActivate: [UserGuard]
  }, {
    path: 'update/:id',
    component: CustomerUpdateComponent
  }, {
    path: '',
    pathMatch: 'full',
    redirectTo: 'list'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule {
}
