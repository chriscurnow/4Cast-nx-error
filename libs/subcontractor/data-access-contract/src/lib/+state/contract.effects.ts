import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/angular';

import * as ContractActions from './contract.actions';
import * as ContractFeature from './contract.reducer';

@Injectable()
export class ContractEffects {
  init$ = createEffect(() =>
    this.dataPersistence.fetch(ContractActions.init, {
      run: (
        action: ReturnType<typeof ContractActions.init>,
        state: ContractFeature.ContractPartialState
      ) => {
        // Your custom service 'load' logic goes here. For now just return a success action...
        return ContractActions.loadContractSuccess({ contract: [] });
      },
      onError: (action: ReturnType<typeof ContractActions.init>, error) => {
        console.error('Error', error);
        return ContractActions.loadContractFailure({ error });
      },
    })
  );

  constructor(
    private readonly actions$: Actions,
    private readonly dataPersistence: DataPersistence<ContractFeature.ContractPartialState>
  ) {}
}
