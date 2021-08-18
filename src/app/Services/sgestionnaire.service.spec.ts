import { TestBed } from '@angular/core/testing';

import { SgestionnaireService } from './sgestionnaire.service';

describe('SgestionnaireService', () => {
  let service: SgestionnaireService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SgestionnaireService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
