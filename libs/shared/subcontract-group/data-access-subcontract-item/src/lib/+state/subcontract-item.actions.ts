import { createAction, props } from '@ngrx/store';

import { Subcontract, SubcontractItem } from '@workspace/shared/data-access-models';

export const init = createAction('[SubcontractItem Page] Init');

//
// LOAD SUBCONTRACT ITEMS
//
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

//
// LOAD ITEMS FOR SUBCONTRACT
//
export const loadItemsForSubcontract = createAction(
  '[Subcontract Items List Container Form] Load Items for Subcontract',
   props<{ subcontractId: string}>()
);

export const loadItemsForSubcontractSuccess = createAction(
  '[Subcontract Detail Form] Load Items for Subcontract Success',
  props<{ subcontractItems: SubcontractItem[] }>()
);

export const loadItemsForSubcontractFailure = createAction(
  '[Subcontract Detail Form] Load SubcontractItems Failure',
  props<{ error: any }>()
);

export const createSubcontractItem = createAction(
  '[SubcontractItem/API] Create Subcontract Item',
  props<{ item: SubcontractItem }>()
)

export const createSubcontractItemSuccess = createAction(
  '[SubcontractItem/API] Create Subcontract Item Success',
  props<{item: SubcontractItem }>()
);

export const createSubcontractItemFailure = createAction(
  '[SubcontractItem/API] Create Subcontract Item Failure',
  props<{ error: any }>()
);


export const loadSubcontractItem = createAction(
  '[Subcontract Item Detail Form] Load Subcontract Item',
  props<{ subcontractItemId: string}>()
)

export const loadSubcontractItemSuccess = createAction(
  '[API Subcontract Item] Load Subcontract Item Success',
  props<{subcontractItem: SubcontractItem }>()
)

export const loadSubcontractItemFailure = createAction(
  '[Subcontract Item Detail Form] Load Subcontract Item Failure',
  props<{ error: any }>()
)


export const createVariation = createAction(
  '[Subcontract Detail Form] Create Variation',
  props<{subcontract: Subcontract}>()
)




