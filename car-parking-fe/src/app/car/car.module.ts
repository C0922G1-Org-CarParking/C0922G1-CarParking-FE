import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarInOutComponent } from './car-in-out/car-in-out.component';
import {CarRoutingModule} from './car-routing.module';


@NgModule({
  declarations: [CarInOutComponent],
  imports: [
    CommonModule,
    CarRoutingModule,
  ]
})
export class CarModule { }
