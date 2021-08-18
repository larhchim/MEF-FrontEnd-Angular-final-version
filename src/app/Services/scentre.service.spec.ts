import { TestBed } from '@angular/core/testing';

import { ScentreService } from './scentre.service';

describe('ScentreService', () => {
  let service: ScentreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScentreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
