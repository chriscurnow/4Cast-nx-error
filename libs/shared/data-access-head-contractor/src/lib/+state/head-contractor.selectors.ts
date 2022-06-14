import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  HEAD_CONTRACTOR_FEATURE_KEY,
  State,
  headContractorAdapter,
} from './head-contractor.reducer';

// Lookup the 'HeadContractor' feature state managed by NgRx
export const getHeadContractorState = createFeatureSelector<State>(
  HEAD_CONTRACTOR_FEATURE_KEY
);

const { selectAll, selectEntities } = headContractorAdapter.getSelectors();

export const getHeadContractorLoaded = createSelector(
  getHeadContractorState,
  (state: State) => state.loaded
);

export const getHeadContractorError = createSelector(
  getHeadContractorState,
  (state: State) => state.error
);

export const getAllHeadContractor = createSelector(
  getHeadContractorState,
  (state: State) => selectAll(state)
);

export const getHeadContractorEntities = createSelector(
  getHeadContractorState,
  (state: State) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getHeadContractorState,
  (state: State) => state.selectedId
);

export const getSelected = createSelector(
  getHeadContractorEntities,
  getSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);
