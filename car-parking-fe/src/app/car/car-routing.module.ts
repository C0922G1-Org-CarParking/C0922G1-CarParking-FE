import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {CarInComponent} from './car-in/car-in.component';
import {CarOutComponent} from './car-out/car-out.component';




const routes: Routes = [
  {
    path: 'car-in',
    component: CarInComponent
  }, {
    path: 'car-out',
    component: CarOutComponent
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CarRoutingModule {
}
