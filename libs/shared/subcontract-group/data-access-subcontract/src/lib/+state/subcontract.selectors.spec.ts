import { SubcontractEntity } from './subcontract.models';
import {
  subcontractAdapter,
  SubcontractPartialState,
  initialState,
} from './subcontract.reducer';
import * as SubcontractSelectors from './subcontract.selectors';

describe('Subcontract Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getSubcontractId = (it: SubcontractEntity) => it.id;
  const createSubcontractEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as SubcontractEntity);

  let state: SubcontractPartialState;

  beforeEach(() => {
    state = {
      subcontract: subcontractAdapter.setAll(
        [
          createSubcontractEntity('PRODUCT-AAA'),
          createSubcontractEntity('PRODUCT-BBB'),
          createSubcontractEntity('PRODUCT-CCC'),
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

  describe('Subcontract Selectors', () => {
    it('getAllSubcontract() should return the list of Subcontract', () => {
      const results = SubcontractSelectors.getAllSubcontract(state);
      const selId = getSubcontractId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = SubcontractSelectors.getSelected(
        state
      ) as SubcontractEntity;
      const selId = getSubcontractId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSubcontractLoaded() should return the current "loaded" status', () => {
      const result = SubcontractSelectors.getSubcontractLoaded(state);

      expect(result).toBe(true);
    });

    it('getSubcontractError() should return the current "error" state', () => {
      const result = SubcontractSelectors.getSubcontractError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
