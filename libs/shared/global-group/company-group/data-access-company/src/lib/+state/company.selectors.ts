import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  COMPANY_FEATURE_KEY,
  CompanyEntityState,
  companyAdapter,
} from './company.reducer';
import { selectRouteParams } from './company.router.selectors';

// Lookup the 'Company' feature state managed by NgRx
export const getCompanyState =
  createFeatureSelector<CompanyEntityState>(COMPANY_FEATURE_KEY);

const { selectAll, selectEntities } = companyAdapter.getSelectors();

export const getCompanyLoaded = createSelector(
  getCompanyState,
  (state: CompanyEntityState) => state.loaded
);

export const getCompanyError = createSelector(
  getCompanyState,
  (state: CompanyEntityState) => state.error
);

export const getAllCompanies = createSelector(
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

export const getSelectedCompany = createSelector(
  getCompanyEntities,
  selectRouteParams,
  (entities, { companyId }) => (companyId ? entities[companyId] : undefined)
);
