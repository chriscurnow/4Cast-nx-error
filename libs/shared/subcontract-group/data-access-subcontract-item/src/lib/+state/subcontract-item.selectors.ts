import { createFeatureSelector, createSelector, Store } from '@ngrx/store';
import { SubcontractItem } from '@workspace/shared/data-access-models';
import {
  SUBCONTRACT_ITEM_FEATURE_KEY,
  SubcontractItemEntityState,
  subcontractItemAdapter,
} from './subcontract-item.reducer';
import { selectSelectedSubcontractId } from '@workspace/shared/subcontract-group/data-access-subcontract';

// Lookup the 'SubcontractItem' feature state managed by NgRx
export const getSubcontractItemState =
  createFeatureSelector<SubcontractItemEntityState>(
    SUBCONTRACT_ITEM_FEATURE_KEY
  );

const { selectAll, selectEntities } = subcontractItemAdapter.getSelectors();

export const getSubcontractItemLoaded = createSelector(
  getSubcontractItemState,
  (state: SubcontractItemEntityState) => state.loaded
);

export const getSubcontractItemError = createSelector(
  getSubcontractItemState,
  (state: SubcontractItemEntityState) => state.error
);

export const selectAllSubcontractItem = createSelector(
  getSubcontractItemState,
  (state: SubcontractItemEntityState) => selectAll(state)
);

export const selectSubcontractItemEntities = createSelector(
  getSubcontractItemState,
  (state: SubcontractItemEntityState) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getSubcontractItemState,
  (state: SubcontractItemEntityState) => state.selectedId
);

export const selectOriginalItem = createSelector(
  selectAllSubcontractItem,
  (items: SubcontractItem[]) =>
    items.filter((item) => item.itemNumber == 0)
);

export const selectVariationItems = createSelector(
  selectAllSubcontractItem,
  (items: SubcontractItem[]) => items.filter((item) => item.itemNumber as number > 0)
);

export const selectItemsForSubcontract = createSelector(
  selectAllSubcontractItem,
  selectSelectedSubcontractId,
  ((items: SubcontractItem[], id: string | undefined) => items.filter(item => item.subcontractId == id))
);



export const getSelected = createSelector(
  selectSubcontractItemEntities,
  getSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);