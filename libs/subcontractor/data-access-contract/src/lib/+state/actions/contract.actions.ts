import { createAction, props } from '@ngrx/store';
import { Contract } from '../contract.models';

export const init = createAction('[Contract Page] Init');

export const loadContractsList = createAction('[Contract/API] Load Contracts');

export const loadContractsListSuccess = createAction(
  '[Contract/API] Load Contracts Success',
  props<{ contracts: Contract[] }>()
);

export const loadContractsListFailure = createAction(
  '[Contract/API] Load Contract Failure',
  props<{ error: any }>()
);


export const loadContract = createAction(
  '[Contracts/API] Load Contract',
  props<{ contractId: string }>()
)

export const loadContractSuccess = createAction(
    '[Contracts/API] Load Contract Success',
    props<{ contract: Contract | undefined}>()
);

// action action
export const loadContractFailure = createAction(
  '[Contracts/API] Load Contract Failure',
   props<{error: any}>()
);
