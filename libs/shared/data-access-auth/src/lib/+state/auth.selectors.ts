import { createFeatureSelector, createSelector } from '@ngrx/store';

import { AUTH_FEATURE_KEY, State } from './auth.reducer';

// Lookup the 'Auth' feature state managed by NgRx
export const getAuthState = createFeatureSelector<State>(AUTH_FEATURE_KEY);

export const selectAuthToken = createSelector(
  getAuthState,
  (state: State) => state.token
);

export const selectIsAuthenticated = createSelector(
  getAuthState,
  (state: State) => !!state?.token
);
