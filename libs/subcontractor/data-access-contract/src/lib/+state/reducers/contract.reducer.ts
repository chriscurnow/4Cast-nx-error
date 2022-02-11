import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action, createSelector, createFeatureSelector } from '@ngrx/store';
import { Subcontract } from '@workspace/shared/data-access-router'
import * as ContractActions from '../actions/contract.actions';
import { ContractEntity } from '../contract.models';

export const CONTRACT_FEATURE_KEY = 'contract';

// export type CarState = EntityState<Car>;

export interface ContractState extends EntityState<Subcontract> {
  selectedId?: string | number; // which Subcontract record has been selected
  loaded: boolean; // has the Subcontract list been loaded
  error?: string | null; // last known error (if any)
}

export interface ContractPartialState {
  readonly [CONTRACT_FEATURE_KEY]: ContractState;
}

// export const carAdapter = createEntityAdapter<Car>({
//   selectId: car => car.id,
// });

export const contractAdapter: EntityAdapter<Subcontract> = createEntityAdapter<Subcontract>({
  selectId: contract => contract.id, // new line from example
});

// const initialState = carAdapter.getInitialState();

export const initialContractState: ContractState = contractAdapter.getInitialState({
  // set initial required properties
  selectedId: '',
  loaded: false,
  error: null,
});

// export const reducer = createReducer<CarState>(
//   initialState,
//   on(appInit, (state, { cars }) => carAdapter.addMany(cars, state))
// );

// the following is a bit different to the example but I don't think it
// matters.

const contractReducer = createReducer(
  initialContractState,
  on(ContractActions.init, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),

  on(ContractActions.loadContractsList, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),

  on(ContractActions.loadContractsListSuccess, (state, { contracts }) =>
    contractAdapter.setAll(contracts, { ...state, loaded: true })
  ),

  on(ContractActions.loadContractsListFailure, (state, { error }) => ({
    ...state,
    error,
  })),

  on(ContractActions.loadContractSuccess, (state, { contract }) =>
    contractAdapter.setOne(contract as Subcontract, { ...state, loaded:true })
  )

);

export function reducer(state: ContractState | undefined, action: Action) {
  return contractReducer(state, action);
}



