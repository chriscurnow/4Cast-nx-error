import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as GlobalActions from './global.actions';
import { GlobalEntity } from './global.models';

export const GLOBAL_FEATURE_KEY = 'global';

export interface State extends EntityState<GlobalEntity> {
  selectedId?: string | number; // which Global record has been selected
  loaded: boolean; // has the Global list been loaded
  error?: string | null; // last known error (if any)
}

export interface GlobalPartialState {
  readonly [GLOBAL_FEATURE_KEY]: State;
}

export const globalAdapter: EntityAdapter<GlobalEntity> =
  createEntityAdapter<GlobalEntity>();

export const initialState: State = globalAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const globalReducer = createReducer(
  initialState,
  on(GlobalActions.init, (state) => ({ ...state, loaded: false, error: null })),
  on(GlobalActions.loadGlobalSuccess, (state, { global }) =>
    globalAdapter.setAll(global, { ...state, loaded: true })
  ),
  on(GlobalActions.loadGlobalFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return globalReducer(state, action);
}
