import { createAction, props } from '@ngrx/store';

import {
  SubcontractItem,
} from '@workspace/shared/data-access-models';



/******************************************************************
 * LOAD SUBCONTRACT ITEM
 *******************************************************************/
export const loadSubcontractItem = createAction(
  '[Subcontract Item Detail Form] Load Subcontract Item',
  props<{ projectId: string, subcontractId: string, subcontractItemId: string}>()
)

export const loadSubcontractItemSuccess = createAction(
  '[API Subcontract Item] Load Subcontract Item Success',
  props<{subcontractItem: SubcontractItem }>()
)

export const loadSubcontractItemFailure = createAction(
  '[Subcontract Item Detail Form] Load Subcontract Item Failure',
  props<{ error: any }>()
)
