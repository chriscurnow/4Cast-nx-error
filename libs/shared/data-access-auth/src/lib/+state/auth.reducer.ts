import { createReducer, on, Action } from '@ngrx/store';

import * as AuthActions from './auth.actions';

export const AUTH_FEATURE_KEY = 'auth';

export interface State {
  token: string | undefined;
}

export interface AuthPartialState {
  readonly [AUTH_FEATURE_KEY]: State;
}

export const initialState: State = {
  // set initial required properties
  token: undefined,
};

const authReducer = createReducer(
  initialState,

  on(AuthActions.authLogout, (state) => ({
    ...state,
    token: undefined,
  })),

  on(AuthActions.authTokenUpdate, (state, { token }) => ({
    ...state,
    token,
  })),

  on(AuthActions.authInterceptorUnauthorized, (state) => ({
    ...state,
    token: undefined,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return authReducer(state, action);
}
