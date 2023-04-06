import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ErrorPageComponent} from "./error-page/error-page.component";
import {canActivate} from "@angular/fire/auth-guard";
import {AdminGuard} from "./security-authentication/security-auth/admin.guard";
import {UserGuard} from "./security-authentication/security-auth/user.guard";
import {LandingPageComponent} from "./landing-page/landing-page.component";


const routes: Routes = [ {
  path: '',
  component: LandingPageComponent
},
  {
    path: 'homepage',
    loadChildren: () => import('./home-page/home-page.module').then(module => module.HomePageModule),
    canActivate: [UserGuard]
  },
  {
    path: 'employee',
    loadChildren: () => import('./employee/employee.module').then(module => module.EmployeeModule),
    canActivate: [AdminGuard]
  }, {
    path: 'customer',
    loadChildren: () => import('./customer/customer.module').then(module => module.CustomerModule),
    canActivate: [UserGuard]
  }, {
    path: 'car',
    loadChildren: () => import('./car/car.module').then(module => module.CarModule),
    canActivate: [UserGuard]
  }, {
    path: 'ticket',
    loadChildren: () => import('./ticket/ticket.module').then(module => module.TicketModule),
    canActivate: [UserGuard]
  }, {
    path: 'statistic',
    loadChildren: () => import('./statistic/statistic.module').then(module => module.StatisticModule),
    canActivate: [AdminGuard]
  }, {
    path: 'location',
    loadChildren: () => import('./location/location.module').then(module => module.LocationModule),
    canActivate: [UserGuard]
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
