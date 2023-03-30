import { TestBed } from '@angular/core/testing';

import { ParkingLocationService } from './parking-location.service';

describe('ParkingLocationService', () => {
  let service: ParkingLocationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParkingLocationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
