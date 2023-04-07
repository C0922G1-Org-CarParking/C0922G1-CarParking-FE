import { TestBed } from '@angular/core/testing';

import { ParkingNewsService } from './parking-news.service';

describe('ParkingNewsService', () => {
  let service: ParkingNewsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParkingNewsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
