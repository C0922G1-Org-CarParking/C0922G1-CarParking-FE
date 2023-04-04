import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ErrorPageComponent} from "./error-page/error-page.component";
import {canActivate} from "@angular/fire/auth-guard";


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home-page/home-page.module').then(module => module.HomePageModule)
  },
  {
    path: 'employee',
    loadChildren: () => import('./employee/employee.module').then(module => module.EmployeeModule)
  }, {
    path: 'customer',
    loadChildren: () => import('./customer/customer.module').then(module => module.CustomerModule),
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
  },
  {
    path: 'security',
    loadChildren: () => import('./security-authentication/security-authentication.module')
      .then(module => module.SecurityAuthenticationModule)
  }, {
    path: '**',
    component: ErrorPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
