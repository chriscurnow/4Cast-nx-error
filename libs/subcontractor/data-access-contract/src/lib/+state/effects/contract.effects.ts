import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/angular';
import { ContractService } from '../../contract.service'
import { map } from 'rxjs/operators';
import * as ContractActions from '../actions/contract.actions';
import * as ContractFeature from '../reducers/contract.reducer';

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
          .pipe(map((contracts) => ContractActions.loadContractsSuccess({ contracts })))
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

  constructor(
    private readonly actions$: Actions,
    private readonly contractService: ContractService,
    private readonly dataPersistence: DataPersistence<ContractFeature.ContractPartialState>
  ) {}
}
