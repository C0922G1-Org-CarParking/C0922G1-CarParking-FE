import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CustomerListComponent} from './customer-list/customer-list.component';
import {CustomerUpdateComponent} from './customer-update/customer-update.component';
import {CustomerInfoComponent} from './customer-info/customer-info.component';
import {CustomerCreateComponent} from './customer-create/customer-create.component';
import {StatusDeleteCustomerComponent} from './status-delete-customer/status-delete-customer.component';

const routes: Routes = [
  {path: 'list', component: CustomerListComponent},
  {path: 'update/:id', component: CustomerUpdateComponent},
  {path: 'info/:id', component: CustomerInfoComponent},
  {path: 'create', component: CustomerCreateComponent},
  {path: 'delete/:id', component: StatusDeleteCustomerComponent},
  {path: '', pathMatch: 'full', redirectTo: 'list'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule {
}
