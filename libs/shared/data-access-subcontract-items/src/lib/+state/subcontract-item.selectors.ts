import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  SUBCONTRACT_ITEM_FEATURE_KEY,
  State,
  subcontractItemAdapter,
} from './subcontract-item.reducer';

// Lookup the 'SubcontractItem' feature state managed by NgRx
export const getSubcontractItemState = createFeatureSelector<State>(
  SUBCONTRACT_ITEM_FEATURE_KEY
);

const { selectAll, selectEntities } = subcontractItemAdapter.getSelectors();

export const getSubcontractItemLoaded = createSelector(
  getSubcontractItemState,
  (state: State) => state.loaded
);

export const getSubcontractItemError = createSelector(
  getSubcontractItemState,
  (state: State) => state.error
);

export const getAllSubcontractItem = createSelector(
  getSubcontractItemState,
  (state: State) => selectAll(state)
);

export const getSubcontractItemEntities = createSelector(
  getSubcontractItemState,
  (state: State) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getSubcontractItemState,
  (state: State) => state.selectedId
);

export const getSelected = createSelector(
  getSubcontractItemEntities,
  getSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);
