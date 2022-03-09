import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/angular';
import { map } from 'rxjs/operators';
import { SubcontractItemsService } from './Subcontract-items.service';
import * as SubcontractItemActions from './subcontract-item.actions';
import * as SubcontractItemFeature from './subcontract-item.reducer';

@Injectable()
export class SubcontractItemEffects {
  init$ = createEffect(() =>
    this.dataPersistence.fetch(SubcontractItemActions.loadSubcontractItems, {
      run: (
        action: ReturnType<typeof SubcontractItemActions.loadSubcontractItems>,
        state: SubcontractItemFeature.SubcontractItemPartialState
      ) => {
        // Your custom service 'load' logic goes here. For now just return a success action...
        const subcontractId = action.subcontractId;
      return this.subcontractItemsService
      .getContractItems(subcontractId)
      .pipe(
        map((subcontractItems) =>
        SubcontractItemActions.loadSubcontractItemsSuccess({subcontractItems}))
      )},
      onError: (
        action: ReturnType<typeof SubcontractItemActions.loadSubcontractItems>,
        error
      ) => {
        console.error('Error', error);
        return SubcontractItemActions.loadSubcontractItemsFailure({ error });
      },
    })
  );

  constructor(
    private readonly actions$: Actions,
    private readonly subcontractItemsService: SubcontractItemsService,
    private readonly dataPersistence: DataPersistence<SubcontractItemFeature.SubcontractItemPartialState>
  ) {}
}
