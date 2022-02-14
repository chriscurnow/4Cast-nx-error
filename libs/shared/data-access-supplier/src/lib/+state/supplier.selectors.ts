import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  SUPPLIER_FEATURE_KEY,
  State,
  supplierAdapter,
} from './supplier.reducer';

// Lookup the 'Supplier' feature state managed by NgRx
export const getSupplierState =
  createFeatureSelector<State>(SUPPLIER_FEATURE_KEY);

const { selectAll, selectEntities } = supplierAdapter.getSelectors();

export const getSupplierLoaded = createSelector(
  getSupplierState,
  (state: State) => state.loaded
);

export const getSupplierError = createSelector(
  getSupplierState,
  (state: State) => state.error
);

export const getAllSupplier = createSelector(getSupplierState, (state: State) =>
  selectAll(state)
);

export const getSupplierEntities = createSelector(
  getSupplierState,
  (state: State) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getSupplierState,
  (state: State) => state.selectedId
);

export const getSelected = createSelector(
  getSupplierEntities,
  getSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);
