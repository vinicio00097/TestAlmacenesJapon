import { TestBed, inject } from '@angular/core/testing';

import { AuthRouterGuardService } from './auth-router-guard.service';

describe('AuthRouterGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthRouterGuardService]
    });
  });

  it('should be created', inject([AuthRouterGuardService], (service: AuthRouterGuardService) => {
    expect(service).toBeTruthy();
  }));
});
