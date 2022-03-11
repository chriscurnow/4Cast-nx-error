import { Action } from '@ngrx/store';

// import * as SubcontractItemActions from './subcontract-item.actions';

// import { SubcontractItemEntityState } from './subcontract-item.reducer';
// import { State, initialState, reducer } from './subcontract-item.reducer';

// describe('SubcontractItem Reducer', () => {
//   const createSubcontractItemEntity = (
//     id: string,
//     name = ''
//   ): SubcontractItemEntityState => ({
//     id,
//     name: name || `name-${id}`,
//   });

//   describe('valid SubcontractItem actions', () => {
//     it('loadSubcontractItemSuccess should return the list of known SubcontractItem', () => {
//       const subcontractItems = [
//         createSubcontractItemEntity('PRODUCT-AAA'),
//         createSubcontractItemEntity('PRODUCT-zzz'),
//       ];
//       const action = SubcontractItemActions.loadSubcontractItemsSuccess({
//         subcontractItems,
//       });

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
