import { TestBed } from '@angular/core/testing';

import { SAuthentificationService } from './sauthentification.service';

describe('SAuthentificationService', () => {
  let service: SAuthentificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SAuthentificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
