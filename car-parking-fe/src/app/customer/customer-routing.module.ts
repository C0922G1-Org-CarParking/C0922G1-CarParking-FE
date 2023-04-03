import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CustomerListComponent} from './customer-list/customer-list.component';
import {CustomerUpdateComponent} from './customer-update/customer-update.component';
import {CustomerInfoComponent} from "./customer-info/customer-info.component";
import {CustomerCreateComponent} from "./customer-create/customer-create.component";

const routes: Routes = [
  {
    path: 'list',
    component: CustomerListComponent
  }, {
    path: 'update/1',
    component: CustomerUpdateComponent
  }, {
    path: 'info/:id',
    component: CustomerInfoComponent
  }, {
    path: 'create',
    component: CustomerCreateComponent
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
