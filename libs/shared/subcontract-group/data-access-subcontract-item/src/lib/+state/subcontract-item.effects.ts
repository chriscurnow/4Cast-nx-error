

import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/angular';
import { exhaustMap, map, mapTo, mergeMap } from 'rxjs/operators';
import { from, Observable } from 'rxjs';
import { SubcontractItemsService } from './subcontract-items.service';
import * as SubcontractItemActions from './subcontract-item.actions';
import * as SubcontractItemFeature from './subcontract-item.reducer';
import { Subcontract, SubcontractItem } from '@workspace/shared/data-access-models';


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
  //       return this.subcontractItemsService
  //         .getItemsForSubcontract(action.subcontract)
  //         .pipe(
  //           map((subcontractItems) =>
  //             SubcontractItemActions.loadSubcontractItemsSuccess({
  //               subcontractItems,
  //             })
  //           )
  //         );
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

  loadItemsForSubcontract$ = createEffect(() =>
    this.dataPersistence.fetch(SubcontractItemActions.loadItemsForSubcontract, {
      run: (
        action: ReturnType<
          typeof SubcontractItemActions.loadItemsForSubcontract
        >,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        state: SubcontractItemFeature.SubcontractItemPartialState
      ) => {
        return this.subcontractItemsService
          .getItemsForSubcontract(action.subcontract)
          .pipe(
            map((subcontractItems) =>
             {
              return SubcontractItemActions.loadSubcontractItemsSuccess({
                subcontractItems,
              })}
            )
          );
      },
      onError: (
        action: ReturnType<
          typeof SubcontractItemActions.loadItemsForSubcontract
        >,
        error
      ) => {
        console.error('Error', error);
        return SubcontractItemActions.loadItemsForSubcontractFailure({ error });
      },
    })
  );

  // createSubcontractItem$ = createEffect(() =>
  //     this.dataPersistence.optimisticUpdate(SubcontractItemActions.createSubcontractItem, {
  //       run: (
  //         action: ReturnType<typeof SubcontractItemActions.createSubcontractItem>,
  //         state: SubcontractItemFeature.SubcontractItemPartialState
  //       ) => {

  //       }
  //     })
  // )

  createSubcontractItem$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(SubcontractItemActions.createSubcontractItem),
        exhaustMap((action: any) =>{
         const res = from(this.subcontractItemsService.createSubcontractItem(action.item));
         console.log('res', res)
         return res
        })
      ),
    { dispatch: false }
  );

  createVariation = createEffect(
    () =>
      this.actions$.pipe(
        ofType(SubcontractItemActions.createVariation),
        exhaustMap((action: any) => {
          return from(this.subcontractItemsService.createVariation(action.subcontract))
        })
      ),
      { dispatch: false }
  )

  loadSubcontractItem$ = createEffect(() =>
    this.dataPersistence.fetch(SubcontractItemActions.loadSubcontractItem, {
       run: (a: ReturnType<typeof SubcontractItemActions.loadSubcontractItem>, state) => {
        console.log(
          'SUBCONTRACT ITEM EFFECTS load subcontract item, id',
          a.subcontractItemId
        );
         return this.subcontractItemsService.getSubcontractItem(a.subcontractItemId)
         .pipe(
           map((subcontractItem: SubcontractItem) => {
             if(subcontractItem){
               return SubcontractItemActions.loadSubcontractItemSuccess( {subcontractItem} )
             } else {
               return SubcontractItemActions.loadSubcontractItemFailure({ error: 'No subcontract found'})
             }

           })
         );
       },

       onError: (action, error) => {
        console.error('Error', error);
        return SubcontractItemActions.loadSubcontractItemFailure({ error });
      },

    })
  );


  private returnItems(subcontract: Subcontract) {
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

