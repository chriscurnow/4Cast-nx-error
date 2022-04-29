import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createFeature, createReducer, on, Action, createSelector } from '@ngrx/store';

import * as SubcontractItemActions from './subcontract-item.actions';
import { SubcontractItem } from '@workspace/shared/data-access-models';
import { state } from '@angular/animations';

export const SUBCONTRACT_ITEM_FEATURE_KEY = 'subcontractItem';

export interface SubcontractItemEntityState
  extends EntityState<SubcontractItem> {
  selectedId: string; // which SubcontractItem record has been selected
  loaded: boolean; // has the SubcontractItem list been loaded
  error: string | null; // last known error (if any)
}

export interface SubcontractItemPartialState {
  readonly [SUBCONTRACT_ITEM_FEATURE_KEY]: SubcontractItemEntityState;
}

export function selectContractItemId(a: SubcontractItem): string {
  //In this case this would be optional since primary key is id
  return a.id ? a.id : '';
}

export const subcontractItemAdapter: EntityAdapter<SubcontractItem> =
  createEntityAdapter<SubcontractItem>({
    selectId: selectContractItemId

  });

export const initialState: SubcontractItemEntityState =
  subcontractItemAdapter.getInitialState({
    // set initial required properties
    selectedId: '',
    loaded: false,
    error: null
  });


    const subcontractItemReducer = createReducer(
      initialState,
      on(SubcontractItemActions.init, (state) => ({
        ...state,
        loaded: false,
        error: null,
      })),

      on(SubcontractItemActions.loadSubcontractItems, (state) => ({
        ...state,
        loaded: false,
        error: null,
      })),
      on(
        SubcontractItemActions.loadSubcontractItemsSuccess,
        (state, { subcontractItems }) =>
          subcontractItemAdapter.setAll(subcontractItems, {
            ...state,
            loaded: true,
          })
      ),
      on(
        SubcontractItemActions.loadSubcontractItemsFailure,
        (state, { error }) => ({
          ...state,
          error,
        })
      ),
      on(SubcontractItemActions.loadItemsForSubcontract, (state) => ({
        ...state,
        loaded: false,
        error: null,
      })),
      on(
        SubcontractItemActions.loadItemsForSubcontractSuccess,
        (state, { subcontractItems }) =>
          subcontractItemAdapter.setAll(subcontractItems, {
            ...state,
            loaded: true,
          })
      ),

      on(SubcontractItemActions.createSubcontractItem, (state, { item }) =>
        {

          const res = subcontractItemAdapter.addOne(item, {
          ...state,
          loaded: false,
          })
        console.log('create subcontract item');
        return res;
      }
      )
    );



export function reducer(
  state: SubcontractItemEntityState | undefined,
  action: Action
) {
  return subcontractItemReducer(state, action);
}



