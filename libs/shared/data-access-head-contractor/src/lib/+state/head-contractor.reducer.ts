import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as HeadContractorActions from './head-contractor.actions';
import { HeadContractorEntity } from './head-contractor.models';

export const HEAD_CONTRACTOR_FEATURE_KEY = 'headContractor';

export interface State extends EntityState<HeadContractorEntity> {
  selectedId?: string | number; // which HeadContractor record has been selected
  loaded: boolean; // has the HeadContractor list been loaded
  error?: string | null; // last known error (if any)
}

export interface HeadContractorPartialState {
  readonly [HEAD_CONTRACTOR_FEATURE_KEY]: State;
}

export const headContractorAdapter: EntityAdapter<HeadContractorEntity> =
  createEntityAdapter<HeadContractorEntity>();

export const initialState: State = headContractorAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const headContractorReducer = createReducer(
  initialState,
  on(HeadContractorActions.init, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(
    HeadContractorActions.loadHeadContractorSuccess,
    (state, { headContractor }) =>
      headContractorAdapter.setAll(headContractor, { ...state, loaded: true })
  ),
  on(HeadContractorActions.loadHeadContractorFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return headContractorReducer(state, action);
}
