import { SubcontractItem } from '@workspace/shared/data-access-models';
import {
  subcontractItemAdapter,
  SubcontractItemPartialState,
  initialState,
} from './subcontract-item.reducer';
import * as SubcontractItemSelectors from './subcontract-item.selectors';

describe('SubcontractItem Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getSubcontractItemId = (it: SubcontractItem) => it.id;
  const createSubcontractItemEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as SubcontractItem);

  let state: SubcontractItemPartialState;

  beforeEach(() => {
    state = {
      subcontractItem: subcontractItemAdapter.setAll(
        [
          createSubcontractItemEntity('PRODUCT-AAA'),
          createSubcontractItemEntity('PRODUCT-BBB'),
          createSubcontractItemEntity('PRODUCT-CCC'),
        ],
        {
          ...initialState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('SubcontractItem Selectors', () => {
    it('getAllSubcontractItem() should return the list of SubcontractItem', () => {
      const results = SubcontractItemSelectors.selectAllSubcontractItem(state);
      const selId = getSubcontractItemId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = SubcontractItemSelectors.getSelected(
        state
      ) as SubcontractItem;
      const selId = getSubcontractItemId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSubcontractItemLoaded() should return the current "loaded" status', () => {
      const result = SubcontractItemSelectors.getSubcontractItemLoaded(state);

      expect(result).toBe(true);
    });

    it('getSubcontractItemError() should return the current "error" state', () => {
      const result = SubcontractItemSelectors.getSubcontractItemError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
