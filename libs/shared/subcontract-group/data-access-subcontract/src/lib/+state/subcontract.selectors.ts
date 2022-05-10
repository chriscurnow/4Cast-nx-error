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

const { selectAll, selectEntities, selectIds, selectTotal } = subcontractAdapter.getSelectors();

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
  (state: SubcontractEntityState) => {
    const newState = selectAll(state);
    return newState}
);

export const selectSubcontractEntities = createSelector(
  selectSubcontractState,
  (state: SubcontractEntityState) => {
    const entities = selectEntities(state);
    return entities;
  }
);

export const selectSelectedSubcontractId = createSelector(
  selectSubcontractState,
  (state: SubcontractEntityState) => state.selectedId
);

export const selectSelected = createSelector(
  selectSubcontractEntities,
  selectSelectedSubcontractId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);

export const selectSubcontract = createSelector(

  selectSubcontractEntities,
  selectRouteParams,
  (entities, { contractId }) => {
    return entities[contractId];
  }
  // as long as the param in the router is called 'contractId', this should select the correct subcontract
  // INTERESTING, note exmaple uses cars where our original used entities. Are they the same thing?
  // selectSelectedId,
  // (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);


