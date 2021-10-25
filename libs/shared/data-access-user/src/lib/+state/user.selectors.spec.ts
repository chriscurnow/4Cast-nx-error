import { initialState, State, USER_FEATURE_KEY } from './user.reducer';
import * as UserSelectors from './user.selectors';

describe('User Selectors', () => {
  describe('User Selectors', () => {
    it('getAuthState() should return the auth state', () => {
      const state: State = initialState;
      const results = UserSelectors.getUserState({
        [USER_FEATURE_KEY]: state,
      });

      expect(results.loaded).toBe(false);
      expect(results.error).toBe(null);
      expect(results.user).toBe(undefined);
    });
  });
});
