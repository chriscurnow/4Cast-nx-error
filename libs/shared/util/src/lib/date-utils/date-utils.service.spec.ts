import { TestBed } from '@angular/core/testing';

import { DateUtilsService } from './date-utils.service';

describe('DateUtilsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DateUtilsService = TestBed.inject(DateUtilsService);
    expect(service).toBeTruthy();
  });
});
