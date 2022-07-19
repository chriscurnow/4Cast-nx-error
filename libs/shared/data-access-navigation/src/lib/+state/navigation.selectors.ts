import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  NAVIGATION_FEATURE_KEY,
  State,
  // navigationAdapter,
} from './navigation.reducer';

// Lookup the 'Navigation' feature state managed by NgRx
export const getNavigationState = createFeatureSelector<State>(
  NAVIGATION_FEATURE_KEY
);

// const { selectAll, selectEntities } = navigationAdapter.getSelectors();

export const getNavigationError = createSelector(
  getNavigationState,
  (state: State) => state.error
);


export const getAddEntity = createSelector(
  getNavigationState,
  (state: State) => state.addEntity
);

export const getHideAddButton = createSelector(
  getNavigationState,
  (state: State) => state.addButtonHidden
);

