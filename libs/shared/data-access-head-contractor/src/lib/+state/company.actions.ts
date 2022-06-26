import { createAction, props } from '@ngrx/store';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { Company } from '@workspace/shared/data-access-models';
export const init = createAction('[Company Page] Init');

export const loadCompany = createAction(
  '[Company/API] load Company',
  props<{ companyId: string}>

)

export const loadCompanySuccess = createAction(
  '[Company/API] Load Company Success',
  props<{ company: Company }>()
);

export const loadCompanyFailure = createAction(
  '[Company/API] Load Company Failure',
  props<{ error: any }>()
);


export const loadCompanyList = createAction(
  '[Company/API] load Company List'
)

export const loadCompanyListSuccess = createAction(
  '[Company/API] Load Company List Success',
  props<{ companies: Company[] }>()
);

export const loadCompanyListFailure = createAction(
  '[Company/API] Load Company List Failure',
  props<{ error: any }>()
);


