import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/angular';

import * as CompanyActions from './head-contractor.actions';
import * as CompanyFeature from './head-contractor.reducer';

@Injectable()
export class CompanyEffects {
  init$ = createEffect(() =>
    this.dataPersistence.fetch(CompanyActions.init, {
      run: (
        action: ReturnType<typeof CompanyActions.init>,
        state: CompanyFeature.CompanyPartialState
      ) => {
        // Your custom service 'load' logic goes here. For now just return a success action...
        return CompanyActions.loadCompanySuccess({
          {company},
        });
      },
      onError: (
        action: ReturnType<typeof CompanyActions.init>,
        error
      ) => {
        console.error('Error', error);
        return CompanyActions.loadCompanyFailure({ error });
      },
    })
  );

  constructor(
    private readonly actions$: Actions,
    private readonly dataPersistence: DataPersistence<CompanyFeature.CompanyPartialState>
  ) {}
}
