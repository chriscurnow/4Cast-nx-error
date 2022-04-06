import { TestBed } from '@angular/core/testing';

import { SubcontractItemsService } from './subcontract-items.service';

describe('ContractItemsService', () => {
  let service: SubcontractItemsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubcontractItemsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
