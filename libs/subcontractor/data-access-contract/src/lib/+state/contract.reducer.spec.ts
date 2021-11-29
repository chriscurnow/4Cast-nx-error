import { Action } from '@ngrx/store';

import * as ContractActions from './contract.actions';
import { ContractEntity } from './contract.models';
import { State, initialState, reducer } from './contract.reducer';

describe('Contract Reducer', () => {
  const createContractEntity = (id: string, name = ''): ContractEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('valid Contract actions', () => {
    it('loadContractSuccess should return the list of known Contract', () => {
      const contract = [
        createContractEntity('PRODUCT-AAA'),
        createContractEntity('PRODUCT-zzz'),
      ];
      const action = ContractActions.loadContractSuccess({ contract });

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
