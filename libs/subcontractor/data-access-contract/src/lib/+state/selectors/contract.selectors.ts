import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  CONTRACT_FEATURE_KEY,
  State,
  contractAdapter,
} from '../reducers/contract.reducer';

// Lookup the 'Contract' feature state managed by NgRx
export const selectContractState =
  createFeatureSelector<State>(CONTRACT_FEATURE_KEY);

const { selectAll, selectEntities } = contractAdapter.getSelectors();

export const getContractLoaded = createSelector(
  selectContractState,
  (state: State) => state.loaded
);

export const getContractError = createSelector(
  selectContractState,
  (state: State) => state.error
);

export const selectAllContracts = createSelector(selectContractState, (state: State) =>
  selectAll(state)
);

export const selectContractEntities = createSelector(
  selectContractState,
  (state: State) => selectEntities(state)
);

export const getSelectedId = createSelector(
  selectContractState,
  (state: State) => state.selectedId
);

export const getSelected = createSelector(
  selectContractEntities,
  getSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);
