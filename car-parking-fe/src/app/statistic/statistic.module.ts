import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import './chartjs.config.ts';
import { StatisticRoutingModule } from './statistic-routing.module';
import { StatisticByDayMonthYearComponent } from './statistic-by-day-month-year/statistic-by-day-month-year.component';


@NgModule({
  declarations: [StatisticByDayMonthYearComponent],
  imports: [
    CommonModule,
    StatisticRoutingModule
  ]
})
export class StatisticModule { }
