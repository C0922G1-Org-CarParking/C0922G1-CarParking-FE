import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationCustomerDetailComponent } from './location-customer-detail.component';

describe('LocationCustomerDetailComponent', () => {
  let component: LocationCustomerDetailComponent;
  let fixture: ComponentFixture<LocationCustomerDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationCustomerDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationCustomerDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
