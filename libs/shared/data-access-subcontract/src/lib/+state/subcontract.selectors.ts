import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  SUBCONTRACT_FEATURE_KEY,
  State,
  subcontractAdapter,
} from './subcontract.reducer';

// Lookup the 'Subcontract' feature state managed by NgRx
export const getSubcontractState = createFeatureSelector<State>(
  SUBCONTRACT_FEATURE_KEY
);

const { selectAll, selectEntities } = subcontractAdapter.getSelectors();

export const getSubcontractLoaded = createSelector(
  getSubcontractState,
  (state: State) => state.loaded
);

export const getSubcontractError = createSelector(
  getSubcontractState,
  (state: State) => state.error
);

export const getAllSubcontract = createSelector(
  getSubcontractState,
  (state: State) => selectAll(state)
);

export const getSubcontractEntities = createSelector(
  getSubcontractState,
  (state: State) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getSubcontractState,
  (state: State) => state.selectedId
);

export const getSelected = createSelector(
  getSubcontractEntities,
  getSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);
