import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { NxModule } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';
import { Observable } from 'rxjs';

import {
  AUTH_TOKEN,
  LocalStorageService,
} from '@workspace/shared/util-local-storage';

import * as AuthActions from './auth.actions';
import { AuthEffects } from './auth.effects';

describe('AuthEffects', () => {
  let actions: Observable<Action>;
  let effects: AuthEffects;
  let mockLocalStorageService: jest.Mocked<LocalStorageService>;

  beforeEach(() => {
    mockLocalStorageService = {
      storeAuthToken: jest.fn(),
      getAuthToken: jest.fn(),
      removeAuthToken: jest.fn(),
    };
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot(), RouterTestingModule],
      providers: [
        AuthEffects,
        provideMockActions(() => actions),
        provideMockStore(),
        { provide: LocalStorageService, useValue: mockLocalStorageService },
      ],
    });

    effects = TestBed.inject(AuthEffects);
  });

  describe('retrieveTokenFromLocalStorage$', () => {
    it('should not retrieve token if no token was present', () => {
      mockLocalStorageService.getAuthToken.mockReturnValue(null);
      actions = hot('-a-|', { a: AuthActions.authEffectInit() });

      const expected = hot('---|');

      expect(effects.retrieveTokenFromLocalStorage$).toBeObservable(expected);
    });
    it('should retrieve token if token is present', () => {
      mockLocalStorageService.getAuthToken.mockReturnValue('abc');
      actions = hot('-a-|', { a: AuthActions.authEffectInit() });

      const expected = hot('-a-|', {
        a: AuthActions.authTokenUpdate({ token: 'abc' }),
      });

      expect(effects.retrieveTokenFromLocalStorage$).toBeObservable(expected);
    });
  });
});
