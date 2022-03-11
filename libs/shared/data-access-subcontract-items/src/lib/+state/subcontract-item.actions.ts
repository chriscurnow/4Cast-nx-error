import { createAction, props } from '@ngrx/store';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { SubcontractItem } from '@workspace/shared/data-access-models';

export const init = createAction('[SubcontractItem Page] Init');

export const loadSubcontractItems = createAction(
  '[SubcontractItem/API] Load SubcontractItems',
  props<{ subcontractId: string }>()
);

export const loadSubcontractItemsSuccess = createAction(
  '[SubcontractItem/API] Load SubcontractItems Success',
  props<{ subcontractItems: SubcontractItem[] }>()
);

export const loadSubcontractItemsFailure = createAction(
  '[SubcontractItem/API] Load SubcontractItems Failure',
  props<{ error: any }>()
);
