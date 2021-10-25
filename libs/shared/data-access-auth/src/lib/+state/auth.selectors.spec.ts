// [STARTER DOCS] IMPORTANT, always keep an eye on the imports
// especially when they are auto imported by the editor
// make sure that the local (lib local) things are imported using relative paths
// instead of path aliases like "@workspace/<lib-name>/..."
import * as AuthSelectors from './auth.selectors';
import { State, AUTH_FEATURE_KEY } from './auth.reducer';

describe('Auth Selectors', () => {
  describe('Auth Selectors', () => {
    it('selectAuthToken() should return the auth state', () => {
      const state: State = { token: 'abc' };
      const results = AuthSelectors.selectAuthToken({
        [AUTH_FEATURE_KEY]: state,
      });

      expect(results).toBe('abc');
    });
    it('selectIsAuthenticated() should return the auth state', () => {
      const state: State = { token: 'abc' };
      const results = AuthSelectors.selectIsAuthenticated({
        [AUTH_FEATURE_KEY]: state,
      });

      expect(results).toBe(true);
    });
  });
});
