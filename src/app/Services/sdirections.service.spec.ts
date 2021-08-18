import { TestBed } from '@angular/core/testing';

import { SdirectionsService } from './sdirections.service';

describe('SdirectionsService', () => {
  let service: SdirectionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SdirectionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
