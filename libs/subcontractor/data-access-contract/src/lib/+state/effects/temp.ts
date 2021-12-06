import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { navigation } from '@nrwl/angular';
import * as ContractActions from '../actions/contract.actions'
import { ContractDetailComponent } from '@workspace/subcontractor/feature-contracts';
import { map } from 'rxjs/operators'
import { ContractService } from '../../contract.service';

@Injectable()
class TodoEffects {
  loadContract$ = createEffect(() =>
    this.actions$.pipe(
      // listens for the routerNavigation action from @ngrx/router-store
      navigation(ContractDetailComponent, {
        run: (activatedRouteSnapshot: ActivatedRouteSnapshot) => {
          return this.contractService
            .getContract(activatedRouteSnapshot.params['contractId'])
            .pipe(
              map((contract) => ({
                type: ContractActions.loadContractSuccess.name,
                contract: contract,
              }))
            );
        },

        onError: (
          activatedRouteSnapshot: ActivatedRouteSnapshot,
          error: any
        ) => {
          // we can log and error here and return null
          // we can also navigate back
          return null;
        },
      })
    )
  );

  constructor(private actions$: Actions, private contractService: ContractService) {}
}
