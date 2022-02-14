import { Action } from '@ngrx/store';

import * as SupplierActions from './supplier.actions';
import { SupplierEntity } from './supplier.models';
import { State, initialState, reducer } from './supplier.reducer';

describe('Supplier Reducer', () => {
  const createSupplierEntity = (id: string, name = ''): SupplierEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('valid Supplier actions', () => {
    it('loadSupplierSuccess should return the list of known Supplier', () => {
      const supplier = [
        createSupplierEntity('PRODUCT-AAA'),
        createSupplierEntity('PRODUCT-zzz'),
      ];
      const action = SupplierActions.loadSupplierSuccess({ supplier });

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
