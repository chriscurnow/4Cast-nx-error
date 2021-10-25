import { createReducer, on, Action } from '@ngrx/store';

import * as UserActions from './user.actions';
import { UserEntity } from './user.models';

export const USER_FEATURE_KEY = 'user';

export interface State {
  user?: UserEntity;
  loaded: boolean; // has the User been loaded
  error?: string | null; // last known error (if any)
}

export interface UserPartialState {
  readonly [USER_FEATURE_KEY]: State;
}

export const initialState: State = {
  // set initial required properties
  user: undefined,
  loaded: false,
  error: undefined,
};

const userReducer = createReducer(
  initialState,

  on(UserActions.loadUser, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),

  on(UserActions.loadUserSuccess, (state, { user }) => ({
    ...state,
    user,
    loaded: true,
    error: undefined,
  })),

  on(UserActions.loadUserFailure, (state, { error }) => ({
    ...state,
    loaded: false,
    error,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return userReducer(state, action);
}
