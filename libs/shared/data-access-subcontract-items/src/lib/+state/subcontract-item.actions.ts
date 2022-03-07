import { createAction, props } from '@ngrx/store';
import { SubcontractItemEntity } from './subcontract-item.models';

export const init = createAction('[SubcontractItem Page] Init');

export const loadSubcontractItemSuccess = createAction(
  '[SubcontractItem/API] Load SubcontractItem Success',
  props<{ subcontractItem: SubcontractItemEntity[] }>()
);

export const loadSubcontractItemFailure = createAction(
  '[SubcontractItem/API] Load SubcontractItem Failure',
  props<{ error: any }>()
);
