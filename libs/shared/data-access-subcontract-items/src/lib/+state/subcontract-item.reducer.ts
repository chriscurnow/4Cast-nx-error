import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as SubcontractItemActions from './subcontract-item.actions';
import { SubcontractItemEntity } from './subcontract-item.models';

export const SUBCONTRACT_ITEM_FEATURE_KEY = 'subcontractItem';

export interface State extends EntityState<SubcontractItemEntity> {
  selectedId?: string | number; // which SubcontractItem record has been selected
  loaded: boolean; // has the SubcontractItem list been loaded
  error?: string | null; // last known error (if any)
}

export interface SubcontractItemPartialState {
  readonly [SUBCONTRACT_ITEM_FEATURE_KEY]: State;
}

export const subcontractItemAdapter: EntityAdapter<SubcontractItemEntity> =
  createEntityAdapter<SubcontractItemEntity>();

export const initialState: State = subcontractItemAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const subcontractItemReducer = createReducer(
  initialState,
  on(SubcontractItemActions.init, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(
    SubcontractItemActions.loadSubcontractItemSuccess,
    (state, { subcontractItem }) =>
      subcontractItemAdapter.setAll(subcontractItem, { ...state, loaded: true })
  ),
  on(SubcontractItemActions.loadSubcontractItemFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return subcontractItemReducer(state, action);
}
