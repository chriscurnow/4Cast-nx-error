import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/angular';

import * as SubcontractActions from './subcontract.actions';
import * as SubcontractFeature from './subcontract.reducer';
import { SubcontractService } from './Subcontract.service';
import { map } from 'rxjs/operators';
import { Subcontract } from '@workspace/shared/data-access-models';
import { ActivatedRouteSnapshot } from '@angular/router';

@Injectable()
export class SubcontractEffects {
   constructor(
    private readonly actions$: Actions,
    private readonly dataPersistence: DataPersistence<SubcontractFeature.SubcontractPartialState>,
    private subcontractService: SubcontractService
  ) {}

  // init$ = createEffect(() =>
  //   this.dataPersistence.fetch(SubcontractActions.init, {
  //     run: (
  //       action: ReturnType<typeof SubcontractActions.init>,
  //       state: SubcontractFeature.SubcontractPartialState
  //     ) => {
  //       // Your custom service 'load' logic goes here. For now just return a success action...
  //       return SubcontractActions.loadSubcontractSuccess({ subcontract: [] });
  //     },
  //     onError: (action: ReturnType<typeof SubcontractActions.init>, error) => {
  //       console.error('Error', error);
  //       return SubcontractActions.loadSubcontractFailure({ error });
  //     },
  //   })
  // );

  loadSubcontractsList = createEffect(() =>
    this.dataPersistence.fetch(SubcontractActions.loadSubcontractsList, {
      run: (
        action: ReturnType<typeof SubcontractActions.loadSubcontractsList>,
        state: SubcontractFeature.SubcontractPartialState
      ) => {
       return this.getContractListResult();
      },
      onError: (action, error) => {
        console.error('Error', error);
        return SubcontractActions.loadSubcontractsListFailure({ error });
      },
    })
  );

  loadSubcontract$ = createEffect(() =>
    this.dataPersistence.fetch(SubcontractActions.loadSubcontract, {
       run: (a: ReturnType<typeof SubcontractActions.loadSubcontract>, state) => {

         return this.subcontractService.getContract(a.subcontractId)
         .pipe(
           map((subcontract: Subcontract) => {
             if(subcontract){
               return SubcontractActions.loadSubcontractSuccess( {subcontract} )
             } else {
               return SubcontractActions.loadSubcontractFailure({ error: 'No subcontract found'})
             }

           })
         );
       },

       onError: (action, error) => {
        console.error('Error', error);
        return SubcontractActions.loadSubcontractFailure({ error });
      },

    })
  );

  getContractListResult(){
     return this.subcontractService
       .getContractsList()
       .pipe(
         map((subcontracts) =>
           SubcontractActions.loadSubcontractsListSuccess({ subcontracts })
         )
       );
  }
}
