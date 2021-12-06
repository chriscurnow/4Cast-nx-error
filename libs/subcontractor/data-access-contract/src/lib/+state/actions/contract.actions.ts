import { createAction, props } from '@ngrx/store';
import { Contract } from '../contract.models';

export const init = createAction('[Contract Page] Init');

export const loadContracts = createAction('[Contract/API] Load Contracts');

export const loadContractsSuccess = createAction(
  '[Contract/API] Load Contracts Success',
  props<{ contracts: Contract[] }>()
);

export const loadContractsFailure = createAction(
  '[Contract/API] Load Contract Failure',
  props<{ error: any }>()
);

export const loadContractSuccess = createAction(
  '[Contracts/API] Load Contract Success',
  props<{ contract: Contract | undefined }>()
);
