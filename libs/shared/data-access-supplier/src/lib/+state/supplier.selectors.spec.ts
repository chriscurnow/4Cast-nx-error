import { SupplierEntity } from './supplier.models';
import {
  supplierAdapter,
  SupplierPartialState,
  initialState,
} from './supplier.reducer';
import * as SupplierSelectors from './supplier.selectors';

describe('Supplier Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getSupplierId = (it: SupplierEntity) => it.id;
  const createSupplierEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as SupplierEntity);

  let state: SupplierPartialState;

  beforeEach(() => {
    state = {
      supplier: supplierAdapter.setAll(
        [
          createSupplierEntity('PRODUCT-AAA'),
          createSupplierEntity('PRODUCT-BBB'),
          createSupplierEntity('PRODUCT-CCC'),
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

  describe('Supplier Selectors', () => {
    it('getAllSupplier() should return the list of Supplier', () => {
      const results = SupplierSelectors.getAllSupplier(state);
      const selId = getSupplierId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = SupplierSelectors.getSelected(state) as SupplierEntity;
      const selId = getSupplierId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSupplierLoaded() should return the current "loaded" status', () => {
      const result = SupplierSelectors.getSupplierLoaded(state);

      expect(result).toBe(true);
    });

    it('getSupplierError() should return the current "error" state', () => {
      const result = SupplierSelectors.getSupplierError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
