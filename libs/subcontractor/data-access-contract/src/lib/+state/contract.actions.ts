import { createAction, props } from '@ngrx/store';
import { ContractEntity } from './contract.models';

export const init = createAction('[Contract Page] Init');

export const loadContractSuccess = createAction(
  '[Contract/API] Load Contract Success',
  props<{ contract: ContractEntity[] }>()
);

export const loadContractFailure = createAction(
  '[Contract/API] Load Contract Failure',
  props<{ error: any }>()
);
