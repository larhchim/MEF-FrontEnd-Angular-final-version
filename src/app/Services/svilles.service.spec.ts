import { TestBed } from '@angular/core/testing';

import { SvillesService } from './svilles.service';

describe('SvillesService', () => {
  let service: SvillesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SvillesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
