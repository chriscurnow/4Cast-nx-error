import { Action } from '@ngrx/store';

import * as ContractActions from '../actions/contract.actions';
import { ContractEntity } from '../contract.models';
import { ContractState, initialContractState, reducer } from './contract.reducer';


// TODO: [NX-20] Fix contract.reducer.spec.ts
// describe('Contract Reducer', () => {
//   const createContractEntity = (id: string, name = ''): ContractEntity => ({
//     id,
//     name: name || `name-${id}`,
//   });

//   describe('valid Contract actions', () => {
//     it('loadContractsListuccess should return the list of known Contract', () => {
//       const contract = [
//         createContractEntity('PRODUCT-AAA'),
//         createContractEntity('PRODUCT-zzz'),
//       ];
//       const action = ContractActions.loadContractsListuccess({ contract });

//       const result: State = reducer(initialState, action);

//       expect(result.loaded).toBe(true);
//       expect(result.ids.length).toBe(2);
//     });
//   });

//   describe('unknown action', () => {
//     it('should return the previous state', () => {
//       const action = {} as Action;

//       const result = reducer(initialState, action);

//       expect(result).toBe(initialState);
//     });
//   });
// });
