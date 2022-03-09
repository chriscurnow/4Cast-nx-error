import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  SUBCONTRACT_ITEM_FEATURE_KEY,
  SubcontractItemEntityState,
  subcontractItemAdapter,
} from './subcontract-item.reducer';

// Lookup the 'SubcontractItem' feature state managed by NgRx
export const getSubcontractItemState = createFeatureSelector<SubcontractItemEntityState>(
  SUBCONTRACT_ITEM_FEATURE_KEY
);

const { selectAll, selectEntities } = subcontractItemAdapter.getSelectors();

export const getSubcontractItemLoaded = createSelector(
  getSubcontractItemState,
  (state: SubcontractItemEntityState) => state.loaded
);

export const getSubcontractItemError = createSelector(
  getSubcontractItemState,
  (state: SubcontractItemEntityState) => state.error
);

export const getAllSubcontractItem = createSelector(
  getSubcontractItemState,
  (state: SubcontractItemEntityState) => selectAll(state)
);

export const getSubcontractItemEntities = createSelector(
  getSubcontractItemState,
  (state: SubcontractItemEntityState) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getSubcontractItemState,
  (state: SubcontractItemEntityState) => state.selectedId
);

export const getSelected = createSelector(
  getSubcontractItemEntities,
  getSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);
