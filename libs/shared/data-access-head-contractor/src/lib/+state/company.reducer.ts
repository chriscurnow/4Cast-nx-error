import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as CompanyActions from './company.actions';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { Company } from '@workspace/shared/data-access-models';
// import { CompanyEntity as Company } from './company.models';

export const COMPANY_FEATURE_KEY = 'company';

export interface CompanyEntityState extends EntityState<Company> {
  selectedId?: string | number; // which Company record has been selected
  loaded: boolean; // has the Company list been loaded
  error?: string | null; // last known error (if any)
}

export function sortByName(a: Company, b: Company): number {
 if (a.companyName && b.companyName){
   return a.companyName.localeCompare(b.companyName);
 } else {
  return 0;
 }

}

export interface CompanyPartialState {
  readonly [COMPANY_FEATURE_KEY]: CompanyEntityState;
}

export const companyAdapter: EntityAdapter<Company> =
  createEntityAdapter<Company>({
    sortComparer: sortByName
  });

export const initialState: CompanyEntityState =
  companyAdapter.getInitialState({
    // set initial required properties
    selectedId: '',
    loaded: false,
    error: null
  });

const companyReducer = createReducer(
  initialState,
  on(CompanyActions.init, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(
    CompanyActions.loadCompanySuccess,
    (state, { company }) =>
      companyAdapter.setOne(company, { ...state, loaded: true })
  ),
  on(CompanyActions.loadCompanyFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(CompanyActions.loadCompanyList, (state) => ({
    ...state,
    loaded: false,
    error: null
  })
  ),
  on(CompanyActions.loadCompanyListSuccess, (state, { companies }) =>
    companyAdapter.setAll(companies, { ...state, loaded: true})
  ),
   on(CompanyActions.loadCompanyListFailure, (state, { error }) => ({
    ...state,
    error,
  }))
)

export function reducer(state: CompanyEntityState | undefined, action: Action) {
  return companyReducer(state, action);
}
