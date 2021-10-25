import { Action } from '@ngrx/store';

import * as UserActions from './user.actions';
import { State, initialState, reducer } from './user.reducer';

describe('User Reducer', () => {
  describe('valid User actions', () => {
    it('resets loading flag and error on loaddUser', () => {
      const action = UserActions.loadUser();

      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(false);
      expect(result.error).toBe(null);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
