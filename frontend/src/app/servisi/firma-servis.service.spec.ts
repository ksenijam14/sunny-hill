import { TestBed } from '@angular/core/testing';

import { FirmaServisService } from './firma-servis.service';

describe('FirmaServisService', () => {
  let service: FirmaServisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirmaServisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
