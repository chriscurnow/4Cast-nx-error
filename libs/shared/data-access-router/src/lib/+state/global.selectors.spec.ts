import { GlobalEntity } from './global.models';
import {
  globalAdapter,
  GlobalPartialState,
  initialState,
} from './global.reducer';
import * as GlobalSelectors from './global.selectors';

describe('Global Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getGlobalId = (it: GlobalEntity) => it.id;
  const createGlobalEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as GlobalEntity);

  let state: GlobalPartialState;

  beforeEach(() => {
    state = {
      global: globalAdapter.setAll(
        [
          createGlobalEntity('PRODUCT-AAA'),
          createGlobalEntity('PRODUCT-BBB'),
          createGlobalEntity('PRODUCT-CCC'),
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

  describe('Global Selectors', () => {
    it('getAllGlobal() should return the list of Global', () => {
      const results = GlobalSelectors.getAllGlobal(state);
      const selId = getGlobalId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = GlobalSelectors.getSelected(state) as GlobalEntity;
      const selId = getGlobalId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getGlobalLoaded() should return the current "loaded" status', () => {
      const result = GlobalSelectors.getGlobalLoaded(state);

      expect(result).toBe(true);
    });

    it('getGlobalError() should return the current "error" state', () => {
      const result = GlobalSelectors.getGlobalError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
