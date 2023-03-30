import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarInOutComponent } from './car-in-out.component';

describe('CarInOutComponent', () => {
  let component: CarInOutComponent;
  let fixture: ComponentFixture<CarInOutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarInOutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarInOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
