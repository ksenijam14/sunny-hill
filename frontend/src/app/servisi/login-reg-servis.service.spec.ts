import { TestBed } from '@angular/core/testing';

import { LoginRegServisService } from './login-reg-servis.service';

describe('LoginRegServisService', () => {
  let service: LoginRegServisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginRegServisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
