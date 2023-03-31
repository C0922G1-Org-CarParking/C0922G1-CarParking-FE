import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomePageContentComponent} from './home-page/home-page-content.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomePageContentComponent
  },
  {
    path: 'employee',
    loadChildren: () => import('./employee/employee.module').then(module => module.EmployeeModule)
  }, {
    path: 'customer',
    loadChildren: () => import('./customer/customer.module').then(module => module.CustomerModule)
  }, {
    path: 'car',
    loadChildren: () => import('./car/car.module').then(module => module.CarModule)
  }, {
    path: 'ticket',
    loadChildren: () => import('./ticket/ticket.module').then(module => module.TicketModule)
  }, {
    path: 'statistic',
    loadChildren: () => import('./statistic/statistic.module').then(module => module.StatisticModule)
  }, {
    path: 'location',
    loadChildren: () => import('./location/location.module').then(module => module.LocationModule)
  }, {
    path: 'test',
    loadChildren: () => import('./test-form/test-form-routing.module').then(module => module.TestFormRoutingModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
