import { createAction, props } from '@ngrx/store';
import { Subcontract } from '@workspace/shared/data-access-router'
export const init = createAction('[Contract Page] Init');

export const loadContractSuccess = createAction(
  '[Contract/API] Load Contract Success',
  props<{ contract: Subcontract[] }>()
);

export const loadContractFailure = createAction(
  '[Contract/API] Load Contract Failure',
  props<{ error: any }>()
);


export const loadContractsList = createAction('[Contract/API] Load Contracts');

export const loadContractsListSuccess = createAction(
  '[Contract/API] Load Contracts Success',
  props<{ contracts: Subcontract[] }>()
);

export const loadContractsListFailure = createAction(
  '[Contract/API] Load Contract Failure',
  props<{ error: any }>()
);

export const loadContract = createAction(
  '[Contracts/API] Load Contract',
  props<{ contractId: string }>()
);


