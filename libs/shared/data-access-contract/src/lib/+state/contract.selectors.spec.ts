import { ContractEntity } from './contract.models';
import {
  contractAdapter,
  ContractPartialState,
  initialState,
} from './contract.reducer';
import * as ContractSelectors from './contract.selectors';

describe('Contract Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getContractId = (it: ContractEntity) => it.id;
  const createContractEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as ContractEntity);

  let state: ContractPartialState;

  beforeEach(() => {
    state = {
      contract: contractAdapter.setAll(
        [
          createContractEntity('PRODUCT-AAA'),
          createContractEntity('PRODUCT-BBB'),
          createContractEntity('PRODUCT-CCC'),
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

  describe('Contract Selectors', () => {
    it('getAllContract() should return the list of Contract', () => {
      const results = ContractSelectors.getAllContract(state);
      const selId = getContractId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = ContractSelectors.getSelected(state) as ContractEntity;
      const selId = getContractId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getContractLoaded() should return the current "loaded" status', () => {
      const result = ContractSelectors.getContractLoaded(state);

      expect(result).toBe(true);
    });

    it('getContractError() should return the current "error" state', () => {
      const result = ContractSelectors.getContractError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
