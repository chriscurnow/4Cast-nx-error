import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/angular';

import * as SubcontractItemActions from './subcontract-item.actions';
import * as SubcontractItemFeature from './subcontract-item.reducer';

@Injectable()
export class SubcontractItemEffects {
  init$ = createEffect(() =>
    this.dataPersistence.fetch(SubcontractItemActions.init, {
      run: (
        action: ReturnType<typeof SubcontractItemActions.init>,
        state: SubcontractItemFeature.SubcontractItemPartialState
      ) => {
        // Your custom service 'load' logic goes here. For now just return a success action...
        return SubcontractItemActions.loadSubcontractItemSuccess({
          subcontractItem: [],
        });
      },
      onError: (
        action: ReturnType<typeof SubcontractItemActions.init>,
        error
      ) => {
        console.error('Error', error);
        return SubcontractItemActions.loadSubcontractItemFailure({ error });
      },
    })
  );

  constructor(
    private readonly actions$: Actions,
    private readonly dataPersistence: DataPersistence<SubcontractItemFeature.SubcontractItemPartialState>
  ) {}
}
