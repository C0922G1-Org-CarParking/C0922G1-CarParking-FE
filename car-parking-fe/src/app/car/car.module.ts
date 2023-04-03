import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarInOutComponent } from './car-in-out/car-in-out.component';
import {CarRoutingModule} from './car-routing.module';
import {FormsModule} from "@angular/forms";
import { CarInComponent } from './car-in/car-in.component';
import { CarOutComponent } from './car-out/car-out.component';


@NgModule({
  declarations: [CarInOutComponent, CarInComponent, CarOutComponent],
    imports: [
        CommonModule,
        CarRoutingModule,
        FormsModule,
    ]
})
export class CarModule { }
