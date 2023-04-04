import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {TicketListComponent} from "./ticket-list/ticket-list.component";
import {TicketCreateComponent} from "./ticket-create/ticket-create.component";
import {TicketUpdateComponent} from "./ticket-update/ticket-update.component";



const routes: Routes = [{
  path: 'list',
  component: TicketListComponent
}, {
  path: 'create',
  component: TicketCreateComponent
},
  {
    path: 'chooseCustomer/:id',
    component: TicketCreateComponent
  }, {
    path: 'update/:id',
    component: TicketUpdateComponent
  }, {
    path: '',
    pathMatch: 'full',
    redirectTo: 'list'
  },
  {
    path: 'findCarListOfCustomerId/:id',
    component: TicketCreateComponent
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]

})
export class TicketRoutingModule {
}
