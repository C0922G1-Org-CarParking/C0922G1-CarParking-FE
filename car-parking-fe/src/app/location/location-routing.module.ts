import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LocationListComponent} from './location-list/location-list.component';
import {LocationDetailComponent} from './location-detail/location-detail.component';
import {LocationCreateComponent} from './location-create/location-create.component';
import {LocationUpdateComponent} from './location-update/location-update.component';
import {LocationMapComponent} from './location-map/location-map.component';
import {LocationCustomerDetailComponent} from "./location-customer-detail/location-customer-detail.component";


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'list',
  }, {
    path: 'list',
    component: LocationListComponent,
  }, {
    path: '#1',
    component: LocationDetailComponent,
  }, {
    path: 'create',
    component: LocationCreateComponent,
  }, {
    path: '#2',
    component: LocationUpdateComponent,
  }, {
    path: 'mapParking',
    component: LocationMapComponent,
  },
  {
    path: 'detailLocationWithCustomer/:id',
    component: LocationCustomerDetailComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocationRoutingModule { }
