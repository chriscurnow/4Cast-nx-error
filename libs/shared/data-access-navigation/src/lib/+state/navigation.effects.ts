import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/angular';

import * as NavigationActions from './navigation.actions';
import * as NavigationFeature from './navigation.reducer';

@Injectable()
export class NavigationEffects {
  init$ = createEffect(() =>
    this.dataPersistence.fetch(NavigationActions.init, {
      run: (
        action: ReturnType<typeof NavigationActions.init>,
        state: NavigationFeature.NavigationPartialState
      ) => {
        // Your custom service 'load' logic goes here. For now just return a success action...
        return NavigationActions.loadNavigationSuccess({ navigation: [] });
      },
      onError: (action: ReturnType<typeof NavigationActions.init>, error) => {
        console.error('Error', error);
        return NavigationActions.loadNavigationFailure({ error });
      },
    })
  );

  constructor(
    private readonly actions$: Actions,
    private readonly dataPersistence: DataPersistence<NavigationFeature.NavigationPartialState>
  ) {}
}
