import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action, createSelector, createFeatureSelector } from '@ngrx/store';
import { SubcontractEntity } from '@workspace/shared/data-access-models'
import * as ContractActions from '../actions/contract.actions';
import { ContractEntity } from '../contract.models';

export const CONTRACT_FEATURE_KEY = 'contract';

// export type CarState = EntityState<Car>;

export interface ContractState extends EntityState<SubcontractEntity> {
  selectedId?: string; // which SubcontractEntity record has been selected
  loaded: boolean; // has the SubcontractEntity list been loaded
  error?: string | null; // last known error (if any)
}

export interface ContractPartialState {
  readonly [CONTRACT_FEATURE_KEY]: ContractState;
}

// export const carAdapter = createEntityAdapter<Car>({
//   selectId: car => car.id,
// });

export const contractAdapter: EntityAdapter<SubcontractEntity> = createEntityAdapter<SubcontractEntity>({
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
    contractAdapter.setOne(contract as SubcontractEntity, { ...state, loaded:true })
  )

);

export function reducer(state: ContractState | undefined, action: Action) {
  return contractReducer(state, action);
}



