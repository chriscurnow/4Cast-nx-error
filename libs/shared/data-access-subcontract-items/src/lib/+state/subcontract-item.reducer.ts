import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as SubcontractItemActions from './subcontract-item.actions';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { SubcontractItem } from '@workspace/shared/data-access-models';

export const SUBCONTRACT_ITEM_FEATURE_KEY = 'subcontractItem';

export interface SubcontractItemEntityState
  extends EntityState<SubcontractItem> {
  selectedId?: string | number; // which SubcontractItem record has been selected
  loaded: boolean; // has the SubcontractItem list been loaded
  error?: string | null; // last known error (if any)
}

export interface SubcontractItemPartialState {
  readonly [SUBCONTRACT_ITEM_FEATURE_KEY]: SubcontractItemEntityState;
}

export const subcontractItemAdapter: EntityAdapter<SubcontractItem> =
  createEntityAdapter<SubcontractItem>();

export const initialState: SubcontractItemEntityState =
  subcontractItemAdapter.getInitialState({
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

  on(SubcontractItemActions.loadSubcontractItems, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(
    SubcontractItemActions.loadSubcontractItemsSuccess,
    (state, { subcontractItems }) =>
      subcontractItemAdapter.setAll(subcontractItems, {
        ...state,
        loaded: true,
      })
  ),
  on(
    SubcontractItemActions.loadSubcontractItemsFailure,
    (state, { error }) => ({
      ...state,
      error,
    })
  )
);

export function reducer(
  state: SubcontractItemEntityState | undefined,
  action: Action
) {
  return subcontractItemReducer(state, action);
}
