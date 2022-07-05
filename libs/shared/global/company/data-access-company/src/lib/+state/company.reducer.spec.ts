import { Action } from '@ngrx/store';

import * as HeadContractorActions from './head-contractor.actions';
import { HeadContractorEntity } from './head-contractor.models';
import { State, initialState, reducer } from './head-contractor.reducer';

describe('HeadContractor Reducer', () => {
  const createHeadContractorEntity = (
    id: string,
    name = ''
  ): HeadContractorEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('valid HeadContractor actions', () => {
    it('loadHeadContractorSuccess should return the list of known HeadContractor', () => {
      const headContractor = [
        createHeadContractorEntity('PRODUCT-AAA'),
        createHeadContractorEntity('PRODUCT-zzz'),
      ];
      const action = HeadContractorActions.loadHeadContractorSuccess({
        headContractor,
      });

      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
