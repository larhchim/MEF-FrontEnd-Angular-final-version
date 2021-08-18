import { TestBed } from '@angular/core/testing';

import { SconcoursService } from './sconcours.service';

describe('SconcoursService', () => {
  let service: SconcoursService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SconcoursService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
