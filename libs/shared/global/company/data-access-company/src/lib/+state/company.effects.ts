import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/angular';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { Company } from '@workspace/shared/data-access-models';

import * as CompanyActions from './company.actions';
import * as CompanyFeature from './company.reducer';
import { CompanyService } from './company.service';
import { map } from 'rxjs/operators';

@Injectable()
export class CompanyEffects {
  init$ = createEffect(() =>
    this.dataPersistence.fetch(CompanyActions.init, {
      run: (
        action: ReturnType<typeof CompanyActions.init>,
        state: CompanyFeature.CompanyPartialState
      ) => {
        // Your custom service 'load' logic goes here. For now just return a success action...
        return this.companyService
          .getCompanyList()
          .pipe(
            map((companies: Company[]) =>
              CompanyActions.loadCompanyListSuccess({ companies })
            )
          );
      },
      onError: (action: ReturnType<typeof CompanyActions.init>, error) => {
        console.error('Error', error);
        return CompanyActions.loadCompanyFailure({ error });
      },
    })
  );

  updateCompany$ = createEffect(() =>
    this.dataPersistence.pessimisticUpdate(CompanyActions.updateCompany, {
      run: (a: ReturnType<typeof CompanyActions.updateCompany>, state) => {
        // console-log('SUBCONTRACT ITEM EFFECTS - create new subcontract item');
        // convert return promise to observable
        return this.companyService.updateCompany(a.company).pipe(
          map((company: Company) => {
            return CompanyActions.updateCompanySuccess({ company });
          })
        );
      },
      onError: (action, error) => {
        console.error('Error', error);
        return CompanyActions.updateCompanyFailure({ error });
      },
    })
  );

  constructor(
    private readonly actions$: Actions,
    private readonly dataPersistence: DataPersistence<CompanyFeature.CompanyPartialState>,
    private companyService: CompanyService
  ) {}
}
