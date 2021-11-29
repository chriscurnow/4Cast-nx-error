import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as ContractActions from './contract.actions';
import { ContractEntity } from './contract.models';

export const CONTRACT_FEATURE_KEY = 'contract';

export interface State extends EntityState<ContractEntity> {
  selectedId?: string | number; // which Contract record has been selected
  loaded: boolean; // has the Contract list been loaded
  error?: string | null; // last known error (if any)
}

export interface ContractPartialState {
  readonly [CONTRACT_FEATURE_KEY]: State;
}

export const contractAdapter: EntityAdapter<ContractEntity> =
  createEntityAdapter<ContractEntity>();

export const initialState: State = contractAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const contractReducer = createReducer(
  initialState,
  on(ContractActions.init, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(ContractActions.loadContractSuccess, (state, { contract }) =>
    contractAdapter.setAll(contract, { ...state, loaded: true })
  ),
  on(ContractActions.loadContractFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return contractReducer(state, action);
}
