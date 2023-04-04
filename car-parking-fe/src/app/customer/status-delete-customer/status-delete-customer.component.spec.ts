import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusDeleteCustomerComponent } from './status-delete-customer.component';

describe('StatusDeleteCustomerComponent', () => {
  let component: StatusDeleteCustomerComponent;
  let fixture: ComponentFixture<StatusDeleteCustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatusDeleteCustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusDeleteCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
