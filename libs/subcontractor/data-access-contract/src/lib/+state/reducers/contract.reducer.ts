import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action, createSelector, createFeatureSelector } from '@ngrx/store';

import * as ContractActions from '../actions/contract.actions';
import { ContractEntity, Contract } from '../contract.models';

export const CONTRACT_FEATURE_KEY = 'contract';

export interface ContractState extends EntityState<Contract> {
  selectedId?: string | number; // which Contract record has been selected
  loaded: boolean; // has the Contract list been loaded
  error?: string | null; // last known error (if any)
}

export interface ContractPartialState {
  readonly [CONTRACT_FEATURE_KEY]: ContractState;
}

export const contractAdapter: EntityAdapter<Contract> =
  createEntityAdapter<Contract>();

export const initialState: ContractState = contractAdapter.getInitialState({
  // set initial required properties
  selectedId: '',
  loaded: false,
  error: null,
});

const contractReducer = createReducer(
  initialState,
  on(ContractActions.init, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),

  on(ContractActions.loadContracts, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),

  on(ContractActions.loadContractsSuccess, (state, { contracts }) =>
    contractAdapter.setAll(contracts, { ...state, loaded: true })
  ),

  on(ContractActions.loadContractsFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function reducer(state: ContractState | undefined, action: Action) {
  return contractReducer(state, action);
}



