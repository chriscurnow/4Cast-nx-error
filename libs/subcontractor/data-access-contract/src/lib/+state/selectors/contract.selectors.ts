// import { createFeatureSelector, createSelector } from '@ngrx/store';
// import {
//   CONTRACT_FEATURE_KEY,
//   ContractState,
//   contractAdapter,
// } from '../reducers/contract.reducer';
// import { selectRouteParams } from './router.selectors';

// // export const carsFeatureSelector = createFeatureSelector<CarState>('cars');

// // Lookup the 'Contract' feature state managed by NgRx
// // RENAME 'getContractState' as 'contractsFeatureSelector'
// export const contractsFeatureSelector =
//   createFeatureSelector<ContractState>(CONTRACT_FEATURE_KEY);

//   //  const { selectEntities, selectAll } = carAdapter.getSelectors();
// const { selectAll, selectEntities } = contractAdapter.getSelectors();



// export const getContractLoaded = createSelector(
//   contractsFeatureSelector,
//   (state: ContractState) => state.loaded
// );

// export const getContractError = createSelector(
//   contractsFeatureSelector,
//   (state: ContractState) => state.error
// );

// // export const selectCars = createSelector(carsFeatureSelector, selectAll);
// // RENAME gotAllContracts as 'selectAllContracts'
// export const selectAllContracts = createSelector(contractsFeatureSelector, (state: ContractState) =>
//   selectAll(state)
// );

// // export const selectCarEntities = createSelector(
// //   carsFeatureSelector,
// //   selectEntities
// // );


// // RENAME getContractEntities to 'selectContractEntities'
// export const selectContractEntities = createSelector(
//   contractsFeatureSelector,
//   (state: ContractState) => selectEntities(state)
// );

// export const getSelectedId = createSelector(
//   contractsFeatureSelector,
//   (state: ContractState) => state.selectedId
// );

// // // you can combine the `selectRouteParams` with `selectCarEntities`
// // // to get a selector for the active car for this component based
// // // on the route
// // export const selectCar = createSelector(
// //   selectCarEntities,
// //   selectRouteParams,
// //   (cars, { carId }) => cars[carId]
// // );

// // export const selectContract = createSelector(
// //   selectContractEntities,
// //   getSelectedId,
// //   (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
// // );

// export const selectContract = createSelector(
//   selectContractEntities,
//   selectRouteParams,
//   (entities, { contractId }) => entities[contractId]
//   // INTERESTING, note exmaple uses cars where our original used entities. Are they the same thing?
//   // getSelectedId,
//   // (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
// );
