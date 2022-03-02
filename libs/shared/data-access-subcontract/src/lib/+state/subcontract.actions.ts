import { createAction, props } from '@ngrx/store';

import { Subcontract} from '@workspace/shared/data-access-models';

export const init = createAction('[Subcontract Page] Init');

export const loadSubcontract = createAction(
  '[Contracts/API] Load Contract',
  props<{ subcontractId: string }>()
);

export const loadSubcontractSuccess = createAction(
  '[Subcontract/API] Load Subcontract Success',
  props<{ subcontract: Subcontract  }>()
);

export const loadSubcontractFailure = createAction(
  '[Subcontract/API] Load Subcontract Failure',
  props<{ error: any }>()
);

export const loadSubcontractsList = createAction('[Contract/API] Load Contracts');

export const loadSubcontractsListSuccess = createAction(
  '[Contract/API] Load Contracts Success',
  props<{ subcontracts: Subcontract[] }>()
);

export const loadSubcontractsListFailure = createAction(
  '[Contract/API] Load Contract Failure',
  props<{ error: any }>()
);


