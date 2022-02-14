import { createAction, props } from '@ngrx/store';
import { SupplierEntity } from './supplier.models';

export const init = createAction('[Supplier Page] Init');

export const loadSupplierSuccess = createAction(
  '[Supplier/API] Load Supplier Success',
  props<{ supplier: SupplierEntity[] }>()
);

export const loadSupplierFailure = createAction(
  '[Supplier/API] Load Supplier Failure',
  props<{ error: any }>()
);
