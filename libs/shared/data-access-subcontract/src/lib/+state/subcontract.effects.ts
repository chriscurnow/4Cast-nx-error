import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/angular';

import * as SubcontractActions from './subcontract.actions';
import * as SubcontractFeature from './subcontract.reducer';

@Injectable()
export class SubcontractEffects {
  init$ = createEffect(() =>
    this.dataPersistence.fetch(SubcontractActions.init, {
      run: (
        action: ReturnType<typeof SubcontractActions.init>,
        state: SubcontractFeature.SubcontractPartialState
      ) => {
        // Your custom service 'load' logic goes here. For now just return a success action...
        return SubcontractActions.loadSubcontractSuccess({ subcontract: [] });
      },
      onError: (action: ReturnType<typeof SubcontractActions.init>, error) => {
        console.error('Error', error);
        return SubcontractActions.loadSubcontractFailure({ error });
      },
    })
  );

  constructor(
    private readonly actions$: Actions,
    private readonly dataPersistence: DataPersistence<SubcontractFeature.SubcontractPartialState>
  ) {}
}
