import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  HEAD_CONTRACTOR_FEATURE_KEY,
  CompanyEntityState,
  companyAdapter,
} from './head-contractor.reducer';

// Lookup the 'Company' feature state managed by NgRx
export const getCompanyState = createFeatureSelector<CompanyEntityState>(
  HEAD_CONTRACTOR_FEATURE_KEY
);

const { selectAll, selectEntities } = companyAdapter.getSelectors();

export const getCompanyLoaded = createSelector(
  getCompanyState,
  (state: CompanyEntityState) => state.loaded
);

export const getCompanyError = createSelector(
  getCompanyState,
  (state: CompanyEntityState) => state.error
);

export const getAllCompany = createSelector(
  getCompanyState,
  (state: CompanyEntityState) => selectAll(state)
);

export const getCompanyEntities = createSelector(
  getCompanyState,
  (state: CompanyEntityState) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getCompanyState,
  (state: CompanyEntityState) => state.selectedId
);

export const getSelected = createSelector(
  getCompanyEntities,
  getSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);
