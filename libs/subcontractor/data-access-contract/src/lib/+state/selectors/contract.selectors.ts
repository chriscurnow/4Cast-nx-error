import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  CONTRACT_FEATURE_KEY,
  State,
  contractAdapter,
} from '../reducers/contract.reducer';

// Lookup the 'Contract' feature state managed by NgRx
export const getContractState =
  createFeatureSelector<State>(CONTRACT_FEATURE_KEY);

const { selectAll, selectEntities } = contractAdapter.getSelectors();

export const getContractLoaded = createSelector(
  getContractState,
  (state: State) => state.loaded
);

export const getContractError = createSelector(
  getContractState,
  (state: State) => state.error
);

export const getAllContracts = createSelector(getContractState, (state: State) =>
  selectAll(state)
);

export const getContractEntities = createSelector(
  getContractState,
  (state: State) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getContractState,
  (state: State) => state.selectedId
);

export const getSelected = createSelector(
  getContractEntities,
  getSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);
