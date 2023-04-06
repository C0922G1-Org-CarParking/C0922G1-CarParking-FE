import { TestBed } from '@angular/core/testing';

import { AccountRoleService } from './account-role.service';

describe('AccountRoleService', () => {
  let service: AccountRoleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountRoleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
