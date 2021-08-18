import { TestBed } from '@angular/core/testing';

import { SinscriptionService } from './sinscription.service';

describe('SinscriptionService', () => {
  let service: SinscriptionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SinscriptionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
