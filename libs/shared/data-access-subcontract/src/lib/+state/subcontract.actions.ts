import { createAction, props } from '@ngrx/store';
import { SubcontractEntity } from '@workspace/shared/util-models';

export const init = createAction('[Subcontract Page] Init');

export const loadSubcontractSuccess = createAction(
  '[Subcontract/API] Load Subcontract Success',
  props<{ subcontract: SubcontractEntity[] }>()
);

export const loadSubcontractFailure = createAction(
  '[Subcontract/API] Load Subcontract Failure',
  props<{ error: any }>()
);

export const loadSubcontractsList = createAction('[Contract/API] Load Contracts');

export const loadSubcontractsListSuccess = createAction(
  '[Contract/API] Load Contracts Success',
  props<{ contracts: SubcontractEntity[] }>()
);

export const loadSubcontractsListFailure = createAction(
  '[Contract/API] Load Contract Failure',
  props<{ error: any }>()
);

export const loadSubcontract = createAction(
  '[Contracts/API] Load Contract',
  props<{ contractId: string }>()
);
