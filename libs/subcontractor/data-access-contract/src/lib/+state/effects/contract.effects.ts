import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { DataPersistence, navigation } from '@nrwl/angular';
import { ContractService } from '../../contract.service'
import { map } from 'rxjs/operators';
import * as ContractActions from '../actions/contract.actions';
import * as ContractFeature from '../reducers/contract.reducer';
import { ActivatedRouteSnapshot } from '@angular/router';
import { ContractDetailComponent } from '@workspace/subcontractor/feature-contracts';


@Injectable()
export class ContractEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly contractService: ContractService,
    private readonly dataPersistence: DataPersistence<ContractFeature.ContractPartialState>
  ) {}

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
              ContractActions.loadContractsListSuccess({ contracts })
            )
          );
        // Your custom service 'load' logic goes here. For now just return a success action...
      },
      onError: (action: ReturnType<typeof ContractActions.init>, error) => {
        console.error('Error', error);
        return ContractActions.loadContractsListFailure({ error });
      },
    })
  );

  loadContractsList$ = createEffect(() =>
    this.dataPersistence.fetch(ContractActions.loadContractsList, {
      run: (
        action: ReturnType<typeof ContractActions.loadContractsList>,
        state: ContractFeature.ContractPartialState
      ) => {
        console.log('Load contracts list effect')
        return this.contractService
          .getContracts()
          .pipe(
            map((contracts) =>
              ContractActions.loadContractsListSuccess({ contracts })
            )
          );
      },
      onError: (
        action: ReturnType<typeof ContractActions.loadContractsList>,
        error
      ) => {
        console.error('Error', error);
        return ContractActions.loadContractsListFailure({ error });
      },
    })
  );

  loadContract$ = createEffect(() =>
    this.dataPersistence.navigation(ContractDetailComponent, {
      run: (
        a,
        state: ContractFeature.ContractPartialState
      ) => {
        console.log('Load contract effect id', a.params['contractId']);
        return this.contractService
          .getContract(a.params['contractId'])
          .pipe(
            map((contract) => {
              console.log('Load contract success, contract', contract)
              return ContractActions.loadContractSuccess({ contract })})
          );
      },
      onError: (
        a,
        error
      ) => {
        console.error('Error', error);
        return ContractActions.loadContractsListFailure({ error });
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
  //               type: ContractActions.loadContractsListuccess,
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
}
