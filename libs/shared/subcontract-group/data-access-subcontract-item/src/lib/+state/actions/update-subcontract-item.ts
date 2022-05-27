import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { SubcontractItem, Subcontract } from '@workspace/shared/data-access-models';

/******************************************************************
 * UPDATE SUBCONTRACT ITEM
 *******************************************************************/
export const updateSubcontractItem = createAction(
  '[Subcontract Item Detail Form] Update Subcontract Item',
  props<{ subcontractItem: SubcontractItem }>()
);

export const updateSubcontractItemSuccess = createAction(
  '[SubcontractItem/API] Update Subcontract Item Success',
  props<{ update: Update<SubcontractItem> }>()
);

export const updateSubcontractItemFailure = createAction(
  '[Subcontract Item Detail Form] Update Subcontract Item Failure',
  props<{ error: any }>()
);

export const createVariation = createAction(
  '[Subcontract Detail Form] Create Variation',
  props<{ subcontract: Subcontract }>()
);
