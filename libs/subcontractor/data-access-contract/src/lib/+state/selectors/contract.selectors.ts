import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  CONTRACT_FEATURE_KEY,
  ContractState,
  contractAdapter,
} from '../reducers/contract.reducer';

// Lookup the 'Contract' feature state managed by NgRx
export const getContractState =
  createFeatureSelector<ContractState>(CONTRACT_FEATURE_KEY);

const { selectAll, selectEntities } = contractAdapter.getSelectors();

export const getContractLoaded = createSelector(
  getContractState,
  (state: ContractState) => state.loaded
);

export const getContractError = createSelector(
  getContractState,
  (state: ContractState) => state.error
);

export const getAllContracts = createSelector(getContractState, (state: ContractState) =>
  selectAll(state)
);

export const getContractEntities = createSelector(
  getContractState,
  (state: ContractState) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getContractState,
  (state: ContractState) => state.selectedId
);

export const selectContract = createSelector(
  getContractEntities,
  getSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);
