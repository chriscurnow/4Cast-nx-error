import { Action } from '@ngrx/store';

import * as SubcontractActions from './subcontract.actions';
import { SubcontractEntity } from './subcontract.models';
import { State, initialState, reducer } from './subcontract.reducer';

describe('Subcontract Reducer', () => {
  const createSubcontractEntity = (
    id: string,
    name = ''
  ): SubcontractEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('valid Subcontract actions', () => {
    it('loadSubcontractSuccess should return the list of known Subcontract', () => {
      const subcontract = [
        createSubcontractEntity('PRODUCT-AAA'),
        createSubcontractEntity('PRODUCT-zzz'),
      ];
      const action = SubcontractActions.loadSubcontractSuccess({ subcontract });

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
