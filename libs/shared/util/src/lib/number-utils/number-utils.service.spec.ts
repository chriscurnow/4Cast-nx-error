import { TestBed } from '@angular/core/testing';

import { NumberUtilsService } from './number-utils.service';

describe('NumberUtilsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NumberUtilsService = TestBed.inject(NumberUtilsService);
    expect(service).toBeTruthy();
  });

  it('#stringToLongNumber should return number version of string', () => {
    const service: NumberUtilsService = TestBed.inject(NumberUtilsService);
    expect(service.stringToLongNumber('1650.53')).toBe(165053);
  });
});
