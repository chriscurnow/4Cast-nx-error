import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as SubcontractActions from './subcontract.actions';
import { SubcontractEntity } from './subcontract.models';

export const SUBCONTRACT_FEATURE_KEY = 'subcontract';

export interface State extends EntityState<SubcontractEntity> {
  selectedId?: string | number; // which Subcontract record has been selected
  loaded: boolean; // has the Subcontract list been loaded
  error?: string | null; // last known error (if any)
}

export interface SubcontractPartialState {
  readonly [SUBCONTRACT_FEATURE_KEY]: State;
}

export const subcontractAdapter: EntityAdapter<SubcontractEntity> =
  createEntityAdapter<SubcontractEntity>();

export const initialState: State = subcontractAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const subcontractReducer = createReducer(
  initialState,
  on(SubcontractActions.init, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(SubcontractActions.loadSubcontractSuccess, (state, { subcontract }) =>
    subcontractAdapter.setAll(subcontract, { ...state, loaded: true })
  ),
  on(SubcontractActions.loadSubcontractFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return subcontractReducer(state, action);
}
