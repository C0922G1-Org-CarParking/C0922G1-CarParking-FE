import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {StatisticByDayMonthYearComponent} from '../statistic/statistic-by-day-month-year/statistic-by-day-month-year.component';
import {LocationListComponent} from './location-list/location-list.component';
import {LocationDetailComponent} from './location-detail/location-detail.component';
import {LocationCreateComponent} from './location-create/location-create.component';
import {LocationUpdateComponent} from './location-update/location-update.component';
import {LocationMapComponent} from './location-map/location-map.component';


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
    path: '#3',
    component: LocationMapComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocationRoutingModule { }
