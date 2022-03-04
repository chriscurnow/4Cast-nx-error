import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  SUBCONTRACT_FEATURE_KEY,
  SubcontractEntityState,
  subcontractAdapter,
} from './subcontract.reducer';
import { selectRouteParams } from './subcontract.router.selectors';

// Lookup the 'Subcontract' feature state managed by NgRx
export const selectSubcontractState = createFeatureSelector<SubcontractEntityState>(
  SUBCONTRACT_FEATURE_KEY
);

const { selectAll, selectEntities } = subcontractAdapter.getSelectors();

export const selectSubcontractLoaded = createSelector(
  selectSubcontractState,
  (state: SubcontractEntityState) => state.loaded
);

export const selectSubcontractError = createSelector(
  selectSubcontractState,
  (state: SubcontractEntityState) => state.error
);

export const selectAllSubcontracts = createSelector(
  selectSubcontractState,
  (state: SubcontractEntityState) => selectAll(state)
);

export const selectSubcontractEntities = createSelector(
  selectSubcontractState,
  (state: SubcontractEntityState) => selectEntities(state)
);

export const selectSelectedId = createSelector(
  selectSubcontractState,
  (state: SubcontractEntityState) => state.selectedId
);

export const selectSelected = createSelector(
  selectSubcontractEntities,
  selectSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);

export const selectSubcontract = createSelector(
  selectSubcontractEntities,
  selectRouteParams,
  (entities, { contractId }) =>
    entities[contractId]
  // as long as the param in the router is called 'contractId', this should select the correct subcontract
  // INTERESTING, note exmaple uses cars where our original used entities. Are they the same thing?
  // selectSelectedId,
  // (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);
