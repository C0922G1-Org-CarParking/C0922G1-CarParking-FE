import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CarRoutingModule} from './car-routing.module';
import {CarInComponent} from './car-in/car-in.component';
import {FormsModule} from '@angular/forms';
import { CarOutComponent } from './car-out/car-out.component';


@NgModule({
  declarations: [CarInComponent, CarOutComponent],
  imports: [
    CommonModule,
    CarRoutingModule,
    FormsModule,
  ]
})
export class CarModule { }
