import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CarInOutComponent} from './car-in-out/car-in-out.component';

const routes: Routes = [{
  path: 'car',
  component: CarInOutComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CarRoutingModule { }
