import { TestBed } from '@angular/core/testing';

import { LoadSubcontractItemsService } from './load-subcontract-items.effects';

describe('LoadSubcontractItemsService', () => {
  let service: LoadSubcontractItemsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadSubcontractItemsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
