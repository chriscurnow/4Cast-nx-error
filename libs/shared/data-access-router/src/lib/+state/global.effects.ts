import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/angular';

import * as GlobalActions from './global.actions';
import * as GlobalFeature from './global.reducer';

@Injectable()
export class GlobalEffects {
  init$ = createEffect(() =>
    this.dataPersistence.fetch(GlobalActions.init, {
      run: (
        action: ReturnType<typeof GlobalActions.init>,
        state: GlobalFeature.GlobalPartialState
      ) => {
        // Your custom service 'load' logic goes here. For now just return a success action...
        return GlobalActions.loadGlobalSuccess({ global: [] });
      },
      onError: (action: ReturnType<typeof GlobalActions.init>, error) => {
        console.error('Error', error);
        return GlobalActions.loadGlobalFailure({ error });
      },
    })
  );

  constructor(
    private readonly actions$: Actions,
    private readonly dataPersistence: DataPersistence<GlobalFeature.GlobalPartialState>
  ) {}
}
