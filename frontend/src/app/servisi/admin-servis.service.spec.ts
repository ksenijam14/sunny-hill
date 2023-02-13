import { TestBed } from '@angular/core/testing';

import { AdminServisService } from './admin-servis.service';

describe('AdminServisService', () => {
  let service: AdminServisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminServisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
