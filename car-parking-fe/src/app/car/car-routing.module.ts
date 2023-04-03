import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CarInOutComponent} from './car-in-out/car-in-out.component';
import {CarInComponent} from './car-in/car-in.component';
import {CarOutComponent} from './car-out/car-out.component';

const routes: Routes = [{
  path: 'car',
  component: CarInOutComponent
},
  {
    path: 'car-in',
    component: CarInComponent
  },
  {
    path: 'car-out',
    component: CarOutComponent
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CarRoutingModule {
}
