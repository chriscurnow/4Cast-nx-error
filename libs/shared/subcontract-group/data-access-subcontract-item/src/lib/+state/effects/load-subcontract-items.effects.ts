import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { exhaustMap, map, mapTo, mergeMap, retryWhen } from 'rxjs/operators';
import { DataPersistence } from '@nrwl/angular';
import { SubcontractItemsService } from '../subcontract-items.service';
import * as ItemActions from '../actions/subcontract-item.actions';
import * as SubcontractItemFeature from '../subcontract-item.reducer';
import {
  Subcontract,
  SubcontractItem,
} from '@workspace/shared/data-access-models';

@Injectable({
  providedIn: 'root',
})
export class LoadSubcontractItemsService {


  loadItemsForSubcontract$ = createEffect(() =>
    this.dataPersistence.fetch(ItemActions.loadItemsForSubcontract, {
      run: (
        action: ReturnType<typeof ItemActions.loadItemsForSubcontract>,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        state: SubcontractItemFeature.SubcontractItemPartialState
      ) => {
        return this.subcontractItemsService
          .getItemsForSubcontract(action.subcontractId)
          .pipe(
            map((subcontractItems: SubcontractItem[]) => {
              return ItemActions.loadItemsForSubcontractSuccess({
                subcontractItems,
              });
            })
          );
      },
      onError: (
        action: ReturnType<typeof ItemActions.loadItemsForSubcontract>,
        error
      ) => {
        console.error('Error', error);
        return ItemActions.loadItemsForSubcontractFailure({ error });
      },
    })
  );

  constructor(
    private readonly actions$: Actions,
    private readonly subcontractItemsService: SubcontractItemsService,
    private readonly dataPersistence: DataPersistence<SubcontractItemFeature.SubcontractItemPartialState>
  ) {}
}
