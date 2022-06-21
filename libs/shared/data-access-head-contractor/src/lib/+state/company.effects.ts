import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/angular';
import { Company } from '@workspace/shared/data-access-models';

import * as CompanyActions from './company.actions';
import * as CompanyFeature from './company.reducer';
import { CompanyService } from './company.service';

@Injectable()
export class CompanyEffects {
  init$ = createEffect(() =>
    this.dataPersistence.fetch(CompanyActions.init, {
      run: (
        action: ReturnType<typeof CompanyActions.init>,
        state: CompanyFeature.CompanyPartialState
      ) => {
        // Your custom service 'load' logic goes here. For now just return a success action...
        this.companyService.getCompanyList
        const company: Company = {};
        return CompanyActions.loadCompanySuccess({
          company,
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
    private readonly dataPersistence: DataPersistence<CompanyFeature.CompanyPartialState>,
    private companyService: CompanyService
  ) {}
}
