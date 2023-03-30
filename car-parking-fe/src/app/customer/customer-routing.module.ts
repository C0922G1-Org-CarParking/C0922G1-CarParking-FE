import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CustomerListComponent} from './customer-list/customer-list.component';
import {CustomerUpdateComponent} from './customer-update/customer-update.component';


const routes: Routes = [
  {
    path: 'list',
    component: CustomerListComponent
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
