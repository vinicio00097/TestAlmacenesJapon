import { TestBed, inject } from '@angular/core/testing';

import { ClienteCredentialsService } from './cliente-credentials.service';

describe('ClienteCredentialsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClienteCredentialsService]
    });
  });

  it('should be created', inject([ClienteCredentialsService], (service: ClienteCredentialsService) => {
    expect(service).toBeTruthy();
  }));
});
