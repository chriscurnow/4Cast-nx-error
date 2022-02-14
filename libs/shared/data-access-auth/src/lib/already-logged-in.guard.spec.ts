import { TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AlreadyLoggedInGuard } from './already-logged-in.guard';

describe('AlreadyLoggedInGuard', () => {
  let guard: AlreadyLoggedInGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [provideMockStore({ initialState: {} })],
    });
    guard = TestBed.inject(AlreadyLoggedInGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
