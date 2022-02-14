import * as AuthActions from './auth.actions';
import { State, initialState, reducer } from './auth.reducer';

describe('Auth Reducer', () => {
  describe('valid Auth actions', () => {
    it('it should update token', () => {
      const action = AuthActions.authTokenUpdate({ token: 'abc' });

      const result: State = reducer(initialState, action);

      expect(result.token).toBe('abc');
    });

    it('it should remove token on logout', () => {
      const action = AuthActions.authLogout();

      const result: State = reducer({ token: 'abc' }, action);

      expect(result.token).toBe(undefined);
    });

    it('it should remove token on unauthorized', () => {
      const action = AuthActions.authInterceptorUnauthorized();

      const result: State = reducer({ token: 'abc' }, action);

      expect(result.token).toBe(undefined);
    });
  });
});
