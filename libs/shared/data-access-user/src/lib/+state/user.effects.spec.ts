import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';
import { Observable, of } from 'rxjs';

import { UserService } from '../user.service';

import * as UserActions from './user.actions';
import { UserEffects } from './user.effects';

const MOCK_USER = { id: 'abc', name: 'User' };

describe('UserEffects', () => {
  let actions: Observable<Action>;
  let effects: UserEffects;
  let mockUserService: jest.Mocked<Partial<UserService>>;

  beforeEach(() => {
    mockUserService = {
      getUser: jest.fn().mockReturnValue(of(MOCK_USER)),
    };
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        UserEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore(),
        { provide: UserService, useValue: mockUserService },
      ],
    });

    effects = TestBed.inject(UserEffects);
  });

  describe('loadUser$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: UserActions.loadUser() });

      const expected = hot('-a-|', {
        a: UserActions.loadUserSuccess({ user: MOCK_USER }),
      });

      expect(effects.loadUser$).toBeObservable(expected);
    });
  });
});
