import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {TicketListComponent} from "./ticket-list/ticket-list.component";
import {TicketCreateComponent} from "./ticket-create/ticket-create.component";
import {TicketUpdateComponent} from "./ticket-update/ticket-update.component";
import {TicketDetailComponent} from "./ticket-detail/ticket-detail.component";
import {StatisticByDayMonthYearComponent} from "../statistic/statistic-by-day-month-year/statistic-by-day-month-year.component";
// import {TicketListComponent} from "./ticket-list/ticket-list.component";
// import {TicketCreateComponent} from "./ticket-create/ticket-create.component";
// import {TicketUpdateComponent} from "./ticket-update/ticket-update.component";


const routes: Routes = [{
  path: 'list',
  component: TicketListComponent
}, {
  path: 'create/:idLocation',
  component: TicketCreateComponent
}
 // {
//
//   path: 'update/:id/:idLocation',
//   component: TicketUpdateComponent
// }
//   , {
//   path: 'update/:id/:idFloor',
//   component: TicketUpdateComponent
// }
, {
  path: '',
  pathMatch: 'full',
  redirectTo: 'list'
},
  {
    path: 'create',
    component: TicketCreateComponent
  },
  {
    path: 'update/:id',
    component: TicketUpdateComponent
  }, {
    path: 'detail/:id',
    component: TicketDetailComponent
  }, {
    path: '',
    pathMatch: 'full',
    redirectTo: 'list'

  },
  {
    path: 'chooseCustomer/:id',
    component: TicketCreateComponent
  }, {
    path: '',
    pathMatch: 'full',
    redirectTo: 'list'
  },
  {
    path: 'findCarListOfCustomerId/:id',
    component: TicketCreateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketRoutingModule {
}
