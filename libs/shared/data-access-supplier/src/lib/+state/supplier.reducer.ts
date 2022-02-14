import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as SupplierActions from './supplier.actions';
import { SupplierEntity } from './supplier.models';

export const SUPPLIER_FEATURE_KEY = 'supplier';

export interface State extends EntityState<SupplierEntity> {
  selectedId?: string | number; // which Supplier record has been selected
  loaded: boolean; // has the Supplier list been loaded
  error?: string | null; // last known error (if any)
}

export interface SupplierPartialState {
  readonly [SUPPLIER_FEATURE_KEY]: State;
}

export const supplierAdapter: EntityAdapter<SupplierEntity> =
  createEntityAdapter<SupplierEntity>();

export const initialState: State = supplierAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const supplierReducer = createReducer(
  initialState,
  on(SupplierActions.init, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(SupplierActions.loadSupplierSuccess, (state, { supplier }) =>
    supplierAdapter.setAll(supplier, { ...state, loaded: true })
  ),
  on(SupplierActions.loadSupplierFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return supplierReducer(state, action);
}
