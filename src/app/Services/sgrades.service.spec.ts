import { TestBed } from '@angular/core/testing';

import { SgradesService } from './sgrades.service';

describe('SgradesService', () => {
  let service: SgradesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SgradesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
