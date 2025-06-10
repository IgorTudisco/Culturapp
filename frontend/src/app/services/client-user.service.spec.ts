import { TestBed } from '@angular/core/testing';

import { ClientUserService } from './client-user.service';

describe('ClientUserService', () => {
  let service: ClientUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
