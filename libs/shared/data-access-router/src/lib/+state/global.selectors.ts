import { createFeatureSelector, createSelector } from '@ngrx/store';
import { GLOBAL_FEATURE_KEY, State, globalAdapter } from './global.reducer';

// Lookup the 'Global' feature state managed by NgRx
export const getGlobalState = createFeatureSelector<State>(GLOBAL_FEATURE_KEY);

const { selectAll, selectEntities } = globalAdapter.getSelectors();

export const getGlobalLoaded = createSelector(
  getGlobalState,
  (state: State) => state.loaded
);

export const getGlobalError = createSelector(
  getGlobalState,
  (state: State) => state.error
);

export const getAllGlobal = createSelector(getGlobalState, (state: State) =>
  selectAll(state)
);

export const getGlobalEntities = createSelector(
  getGlobalState,
  (state: State) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getGlobalState,
  (state: State) => state.selectedId
);

export const getSelected = createSelector(
  getGlobalEntities,
  getSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);
