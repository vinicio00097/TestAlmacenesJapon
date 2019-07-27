import { TestBed, inject } from '@angular/core/testing';

import { PermissionsGuardService } from './permissions-guard.service';

describe('PermissionsGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PermissionsGuardService]
    });
  });

  it('should be created', inject([PermissionsGuardService], (service: PermissionsGuardService) => {
    expect(service).toBeTruthy();
  }));
});
