import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as NavigationActions from './navigation.actions';
import { NavigationEntity } from './navigation.models';

export const NAVIGATION_FEATURE_KEY = 'navigation';

export interface State extends EntityState<NavigationEntity> {
  selectedId?: string | number; // which Navigation record has been selected
  loaded: boolean; // has the Navigation list been loaded
  addEntity?: boolean;
  hideAddButton?: boolean;
  error?: string | null; // last known error (if any)
}

export interface NavigationPartialState {
  readonly [NAVIGATION_FEATURE_KEY]: State;
}

export const navigationAdapter: EntityAdapter<NavigationEntity> =
  createEntityAdapter<NavigationEntity>();

export const initialState: State = navigationAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const navigationReducer = createReducer(
  initialState,
  on(NavigationActions.init, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(NavigationActions.addEntity, (state) => ({
    ...state,
    addEntity: true,
  })),
  on(NavigationActions.addEntitySuccess, (state) => ({
    ...state,
    addEntity: false,
  })),
  on(NavigationActions.addEntityFailure, (state, { error }) => ({
    ...state,
    addEntity: false,
    error,
  })),
  on(NavigationActions.showAddButton, (state) => ({
    ...state,
    hideAddButton: false,
  })),
  on(NavigationActions.hideAddButton, (state) => ({
    ...state,
    hideAddButton: true,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return navigationReducer(state, action);
}
