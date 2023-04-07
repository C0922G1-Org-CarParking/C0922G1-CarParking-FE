import { TestBed } from '@angular/core/testing';

import { CarInOutService } from './car-in-out.service';

describe('CarInOutService', () => {
  let service: CarInOutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarInOutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
