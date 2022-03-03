import { TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { JwtTokenInterceptorInterceptor } from './jwt-token-interceptor.interceptor';

describe('JwtTokenInterceptorInterceptor', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [provideMockStore(), JwtTokenInterceptorInterceptor],
    })
  );

  it('should be created', () => {
    const interceptor: JwtTokenInterceptorInterceptor = TestBed.inject(
      JwtTokenInterceptorInterceptor
    );
    expect(interceptor).toBeTruthy();
  });
});
