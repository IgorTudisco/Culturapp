import { TestBed } from '@angular/core/testing';

import { EnterpriseUserService } from './enterprise-user.service';

describe('EnterpriseUserService', () => {
  let service: EnterpriseUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnterpriseUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
