import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {StatisticByDayMonthYearComponent} from './statistic-by-day-month-year/statistic-by-day-month-year.component';


const routes: Routes = [
  {
    path: 'statistic',
    component: StatisticByDayMonthYearComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatisticRoutingModule { }
