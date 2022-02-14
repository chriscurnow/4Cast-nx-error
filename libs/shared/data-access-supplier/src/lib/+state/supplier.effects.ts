import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/angular';

import * as SupplierActions from './supplier.actions';
import * as SupplierFeature from './supplier.reducer';

@Injectable()
export class SupplierEffects {
  init$ = createEffect(() =>
    this.dataPersistence.fetch(SupplierActions.init, {
      run: (
        action: ReturnType<typeof SupplierActions.init>,
        state: SupplierFeature.SupplierPartialState
      ) => {
        // Your custom service 'load' logic goes here. For now just return a success action...
        return SupplierActions.loadSupplierSuccess({ supplier: [] });
      },
      onError: (action: ReturnType<typeof SupplierActions.init>, error) => {
        console.error('Error', error);
        return SupplierActions.loadSupplierFailure({ error });
      },
    })
  );

  constructor(
    private readonly actions$: Actions,
    private readonly dataPersistence: DataPersistence<SupplierFeature.SupplierPartialState>
  ) {}
}
