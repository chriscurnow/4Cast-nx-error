

import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/angular';
import { map } from 'rxjs/operators';
import { SubcontractItemsService } from './subcontract-items.service';
import * as SubcontractItemActions from './subcontract-item.actions';
import * as SubcontractItemFeature from './subcontract-item.reducer';
import { Subcontract } from '@workspace/shared/data-access-models';

@Injectable()
export class SubcontractItemEffects {
  // init$ = createEffect(() =>
  //   this.dataPersistence.fetch(SubcontractItemActions.loadItemsForSubcontract, {
  //     run: (
  //       action: ReturnType<
  //         typeof SubcontractItemActions.loadItemsForSubcontract
  //       >,
  //       // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //       state: SubcontractItemFeature.SubcontractItemPartialState
  //     ) => {
  //       return this.returnItems(action.subcontract);
  //     },
  //     onError: (
  //       action: ReturnType<
  //         typeof SubcontractItemActions.loadItemsForSubcontract
  //       >,
  //       error
  //     ) => {
  //       console.error('Error', error);
  //       return SubcontractItemActions.loadItemsForSubcontractFailure({ error });
  //     },
  //   })
  // );

//  createItem$ = createEffect(() =>
//     this.dataPersistence.pessimisticUpdate(SubcontractItemActions.loadItemsForSubcontract, {
//       run: (
//         action: ReturnType<
//           typeof SubcontractItemActions.loadItemsForSubcontract
//         >,
//         // eslint-disable-next-line @typescript-eslint/no-unused-vars
//         state: SubcontractItemFeature.SubcontractItemPartialState
//       ) => {
//         return this.returnItems(action.subcontract);
//       },
//       onError: (
//         action: ReturnType<
//           typeof SubcontractItemActions.loadItemsForSubcontract
//         >,
//         error
//       ) => {
//         console.error('Error', error);
//         return SubcontractItemActions.loadItemsForSubcontractFailure({ error });
//       },
//     })
//   );

  returnItems(subcontract: Subcontract) {
    this.subcontractItemsService.getItemsForSubcontract(subcontract).pipe(
      map((subcontractItems) =>
        SubcontractItemActions.loadSubcontractItemsSuccess({
          subcontractItems,
        })
      )
    );
  }

  constructor(
    private readonly actions$: Actions,
    private readonly subcontractItemsService: SubcontractItemsService,
    private readonly dataPersistence: DataPersistence<SubcontractItemFeature.SubcontractItemPartialState>
  ) {}
}

