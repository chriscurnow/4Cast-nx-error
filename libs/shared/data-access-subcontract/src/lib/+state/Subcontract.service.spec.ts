import { TestBed } from '@angular/core/testing';

import { SubcontractService } from './Subcontract.service';

describe('ContractService', () => {
  let service: SubcontractService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubcontractService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
