import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LocationRoutingModule } from './location-routing.module';
import { LocationCreateComponent } from './location-create/location-create.component';
import { LocationListComponent } from './location-list/location-list.component';
import { LocationDetailComponent } from './location-detail/location-detail.component';
import { LocationUpdateComponent } from './location-update/location-update.component';
import { LocationMapComponent } from './location-map/location-map.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [LocationCreateComponent, LocationListComponent, LocationDetailComponent, LocationUpdateComponent, LocationMapComponent],
    imports: [
        CommonModule,
        LocationRoutingModule,
        ReactiveFormsModule,
        FormsModule
    ]
})
export class LocationModule { }
