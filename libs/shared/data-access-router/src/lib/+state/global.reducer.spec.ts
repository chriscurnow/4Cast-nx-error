import { Action } from '@ngrx/store';

import * as GlobalActions from './global.actions';
import { GlobalEntity } from './global.models';
import { State, initialState, reducer } from './global.reducer';

describe('Global Reducer', () => {
  const createGlobalEntity = (id: string, name = ''): GlobalEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('valid Global actions', () => {
    it('loadGlobalSuccess should return the list of known Global', () => {
      const global = [
        createGlobalEntity('PRODUCT-AAA'),
        createGlobalEntity('PRODUCT-zzz'),
      ];
      const action = GlobalActions.loadGlobalSuccess({ global });

      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
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
