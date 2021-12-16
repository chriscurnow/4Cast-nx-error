import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { DataPersistence, navigation } from '@nrwl/angular';
import { ContractService } from '../../contract.service'
import { map } from 'rxjs/operators';
import * as ContractActions from '../actions/contract.actions';
import * as ContractFeature from '../reducers/contract.reducer';
import { ActivatedRouteSnapshot } from '@angular/router';



@Injectable()
export class ContractEffects {
  init$ = createEffect(() =>
    this.dataPersistence.fetch(ContractActions.init, {
      run: (
        action: ReturnType<typeof ContractActions.init>,
        state: ContractFeature.ContractPartialState
      ) => {
        return this.contractService
          .getContracts()
          .pipe(
            map((contracts) =>
              ContractActions.loadContractsSuccess({ contracts })
            )
          );
        // Your custom service 'load' logic goes here. For now just return a success action...
      },
      onError: (action: ReturnType<typeof ContractActions.init>, error) => {
        console.error('Error', error);
        return ContractActions.loadContractsFailure({ error });
      },
    })
  );

    loadContracts$ = createEffect(() =>
    this.dataPersistence.fetch(ContractActions.loadContracts, {
      run: (
        action: ReturnType<typeof ContractActions.loadContracts >,
        state: ContractFeature.ContractPartialState
      ) => {
        return this.contractService
          .getContracts()
          .pipe(
            map((contracts) =>
              ContractActions.loadContractsSuccess({ contracts })
            )
          );
      },
      onError: (action: ReturnType<typeof ContractActions.loadContracts>, error) => {
        console.error('Error', error);
        return ContractActions.loadContractsFailure({ error });
      },
    })
  );


  // TODO: loadContract$ effect introduces circular dependency
  // loadContract$ = createEffect(() =>
  //   this.actions$.pipe(
  //     // listens for the routerNavigation action from @ngrx/router-store
  //     navigation(ContractDetailComponent, {
  //       run: (activatedRouteSnapshot: ActivatedRouteSnapshot) => {
  //         const id = activatedRouteSnapshot.params['contractId'];
  //         console.log('loadContract effect contractId', id)
  //         return this.contractService
  //           .getContract(id)
  //           .pipe(
  //             map((contract) => ({
  //               type: "LOAD_CONTRACT_SUCCESS",
  //               contract: contract,
  //             }))
  //           );
  //       },

  //       onError: (
  //         activatedRouteSnapshot: ActivatedRouteSnapshot,
  //         error: any
  //       ) => {
  //         // we can log and error here and return null
  //         // we can also navigate back
  //         return null;
  //       },
  //     })
  //   )
  // );

  //   this.actions$.pipe(
  //     // listens for the routerNavigation action from @ngrx/router-store
  //     navigation(ContractDetailComponent {
  //       run: (activatedRouteSnapshot: ActivatedRouteSnapshot) => {
  //         return this.contractService
  //           .getContract(activatedRouteSnapshot.params['contractId'])
  //           .pipe(
  //             map((contract) => ({
  //               type: ContractActions.loadContractSuccess,
  //               contract: contract,
  //             }))
  //           );
  //       },

  //       onError: (
  //         activatedRouteSnapshot: ActivatedRouteSnapshot,
  //         error: any
  //       ) => {
  //         // we can log and error here and return null
  //         // we can also navigate back
  //         return null;
  //       },
  //     })
  //   )
  // );

  constructor(
    private readonly actions$: Actions,
    private readonly contractService: ContractService,
    private readonly dataPersistence: DataPersistence<ContractFeature.ContractPartialState>
  ) {}
}
