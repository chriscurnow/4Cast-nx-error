import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  CONTRACT_FEATURE_KEY,
  ContractState,
  contractAdapter,
} from '../reducers/contract.reducer';

// Lookup the 'Contract' feature state managed by NgRx
export const selectContractState =
  createFeatureSelector<ContractState>(CONTRACT_FEATURE_KEY);

const { selectAll, selectEntities } = contractAdapter.getSelectors();

export const getContractLoaded = createSelector(
  selectContractState,
  (state: ContractState) => state.loaded
);

export const getContractError = createSelector(
  selectContractState,
  (state: ContractState) => state.error
);

export const selectAllContracts = createSelector(
  selectContractState,
  (state: ContractState) => selectAll(state)
);

export const selectContractEntities = createSelector(
  selectContractState,
  (state: ContractState) => selectEntities(state)
);

export const getSelectedId = createSelector(
  selectContractState,
  (state: ContractState) => state.selectedId
);

export const getSelected = createSelector(
  selectContractEntities,
  getSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);
