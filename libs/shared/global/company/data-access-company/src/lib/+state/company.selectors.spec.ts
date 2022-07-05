import { HeadContractorEntity } from './head-contractor.models';
import {
  headContractorAdapter,
  HeadContractorPartialState,
  initialState,
} from './head-contractor.reducer';
import * as HeadContractorSelectors from './head-contractor.selectors';

describe('HeadContractor Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getHeadContractorId = (it: HeadContractorEntity) => it.id;
  const createHeadContractorEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as HeadContractorEntity);

  let state: HeadContractorPartialState;

  beforeEach(() => {
    state = {
      headContractor: headContractorAdapter.setAll(
        [
          createHeadContractorEntity('PRODUCT-AAA'),
          createHeadContractorEntity('PRODUCT-BBB'),
          createHeadContractorEntity('PRODUCT-CCC'),
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

  describe('HeadContractor Selectors', () => {
    it('getAllHeadContractor() should return the list of HeadContractor', () => {
      const results = HeadContractorSelectors.getAllHeadContractor(state);
      const selId = getHeadContractorId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = HeadContractorSelectors.getSelected(
        state
      ) as HeadContractorEntity;
      const selId = getHeadContractorId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getHeadContractorLoaded() should return the current "loaded" status', () => {
      const result = HeadContractorSelectors.getHeadContractorLoaded(state);

      expect(result).toBe(true);
    });

    it('getHeadContractorError() should return the current "error" state', () => {
      const result = HeadContractorSelectors.getHeadContractorError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
