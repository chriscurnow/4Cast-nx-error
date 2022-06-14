import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/angular';

import * as HeadContractorActions from './head-contractor.actions';
import * as HeadContractorFeature from './head-contractor.reducer';

@Injectable()
export class HeadContractorEffects {
  init$ = createEffect(() =>
    this.dataPersistence.fetch(HeadContractorActions.init, {
      run: (
        action: ReturnType<typeof HeadContractorActions.init>,
        state: HeadContractorFeature.HeadContractorPartialState
      ) => {
        // Your custom service 'load' logic goes here. For now just return a success action...
        return HeadContractorActions.loadHeadContractorSuccess({
          headContractor: [],
        });
      },
      onError: (
        action: ReturnType<typeof HeadContractorActions.init>,
        error
      ) => {
        console.error('Error', error);
        return HeadContractorActions.loadHeadContractorFailure({ error });
      },
    })
  );

  constructor(
    private readonly actions$: Actions,
    private readonly dataPersistence: DataPersistence<HeadContractorFeature.HeadContractorPartialState>
  ) {}
}
