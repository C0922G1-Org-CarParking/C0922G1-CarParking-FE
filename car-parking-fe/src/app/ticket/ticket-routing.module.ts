import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {TicketListComponent} from "./ticket-list/ticket-list.component";
import {TicketCreateComponent} from "./ticket-create/ticket-create.component";
import {TicketUpdateComponent} from "./ticket-update/ticket-update.component";
<<<<<<< HEAD
import {TicketDetailComponent} from "./ticket-detail/ticket-detail.component";
=======
import {StatisticByDayMonthYearComponent} from "../statistic/statistic-by-day-month-year/statistic-by-day-month-year.component";
>>>>>>> fb78b61370be32eeaa372c8e3ca67b7e7393aaee


const routes: Routes = [
  {
  path: 'list',
  component: TicketListComponent
<<<<<<< HEAD
  },
  {
    path: 'create',
    component: TicketCreateComponent
  },
  {
    path: 'update/:id',
    component: TicketUpdateComponent
  },
  {
    path: 'detail/:id',
    component: TicketDetailComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'list'
=======
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
>>>>>>> fb78b61370be32eeaa372c8e3ca67b7e7393aaee
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketRoutingModule {
}
