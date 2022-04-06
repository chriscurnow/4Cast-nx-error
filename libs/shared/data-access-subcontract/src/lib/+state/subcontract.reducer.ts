import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as SubcontractActions from './subcontract.actions';
import { Subcontract } from '@workspace/shared/data-access-models';

export const SUBCONTRACT_FEATURE_KEY = 'subcontract';

export interface SubcontractEntityState extends EntityState<Subcontract> {
  selectedId?: string; // which Subcontract record has been selected
  loaded: boolean; // has the Subcontract list been loaded
  error?: string | null; // last known error (if any)
}

export interface SubcontractPartialState {
  readonly [SUBCONTRACT_FEATURE_KEY]: SubcontractEntityState;
}

export function selectContractId(a: Subcontract): string {
  //In this case this would be optional since primary key is id
  return a.id ? a.id : '';
}


// TODO: [NX-36] Work out how to sort subcontracts. Sort by name may not make much sense.
export function sortByName(a: Subcontract, b: Subcontract): number {
  if (a.project && b.project && a.project.name && b.project.name) {
    return a.project.name.localeCompare(b.project.name);
  } else {
    return 0;
  }
}

export const subcontractAdapter: EntityAdapter<Subcontract> =
  createEntityAdapter<Subcontract>({
    selectId: selectContractId,
    sortComparer: sortByName,
  });




export const initialSubcontractState: SubcontractEntityState = subcontractAdapter.getInitialState({
  // set initial required properties
  selectedId: '',
  loaded: false,
  error: null
});

const subcontractReducer = createReducer(
  initialSubcontractState,
  on(SubcontractActions.init, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),

  on(SubcontractActions.loadSubcontractsList, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),

  // on(ContractActions.loadContractsListSuccess, (state, { contracts }) =>
  //   contractAdapter.setAll(contracts, { ...state, loaded: true })
  // ),

  on(
    SubcontractActions.loadSubcontractsListSuccess,
    (state, { subcontracts }) =>
      subcontractAdapter.setAll(subcontracts, { ...state, loaded: true })
  ),

  on(SubcontractActions.loadSubcontract, (state) => ({
    ...state,
    loaded: false,
    error: null
  })),

 on(SubcontractActions.loadSubcontractSuccess, (state, { subcontract}) =>
  subcontractAdapter.setOne(subcontract, { ...state, loaded: true})
 ),

  on(SubcontractActions.loadSubcontractFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function reducer(state: SubcontractEntityState | undefined, action: Action) {
  return subcontractReducer(state, action);
}
