import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticByDayMonthYearComponent } from './statistic-by-day-month-year.component';

describe('StatisticByDayMonthYearComponent', () => {
  let component: StatisticByDayMonthYearComponent;
  let fixture: ComponentFixture<StatisticByDayMonthYearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatisticByDayMonthYearComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticByDayMonthYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
