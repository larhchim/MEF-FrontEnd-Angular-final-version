import { TestBed } from '@angular/core/testing';

import { HistoriqueCandidatureService } from './historique-candidature.service';

describe('HistoriqueCandidatureService', () => {
  let service: HistoriqueCandidatureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HistoriqueCandidatureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
