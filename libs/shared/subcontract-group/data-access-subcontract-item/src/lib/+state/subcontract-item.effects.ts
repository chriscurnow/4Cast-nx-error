

import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/angular';
import { exhaustMap, map, mapTo, mergeMap, retryWhen } from 'rxjs/operators';
import { from, Observable } from 'rxjs';
import { SubcontractItemsService } from './subcontract-items.service';
import * as ItemActions from './subcontract-item.actions';
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
    this.dataPersistence.fetch(ItemActions.loadItemsForSubcontract, {
      run: (
        action: ReturnType<typeof ItemActions.loadItemsForSubcontract>,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        state: SubcontractItemFeature.SubcontractItemPartialState
      ) => {
        return this.subcontractItemsService
          .getItemsForSubcontract(action.subcontractId)
          .pipe(
            map((subcontractItems) => {
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


  createSubcontractItem$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ItemActions.createSubcontractItem),
        exhaustMap((action: any) => {
          const res = from(
            this.subcontractItemsService.createSubcontractItem(action.item)
          );
          return res;
        })
      ),
    { dispatch: false }
  );

  createVariation = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ItemActions.createVariation),
        exhaustMap((action: any) => {
          return from(
            this.subcontractItemsService.createVariation(action.subcontract)
          );
        })
      ),
    { dispatch: false }
  );

  loadSubcontractItem$ = createEffect(() =>
    this.dataPersistence.fetch(ItemActions.loadSubcontractItem, {
      run: (a: ReturnType<typeof ItemActions.loadSubcontractItem>, state) => {
        return this.subcontractItemsService
          .getSubcontractItem(a.subcontractItemId)
          .pipe(
            map((subcontractItem: SubcontractItem) => {
              return ItemActions.loadSubcontractItemSuccess({
                subcontractItem,
              });
            })
          );
      },

      onError: (action, error) => {
        console.error('Error', error);
        return ItemActions.loadSubcontractItemFailure({ error });
      },
    })
  );

  createNewSubcontractItem$ = createEffect(() =>
    this.dataPersistence.pessimisticUpdate(
      ItemActions.createNewSubcontractItem,
      {
        run: (
          a: ReturnType<typeof ItemActions.createNewSubcontractItem>,
          state
        ) => {
          console.log('SUBCONTRACT ITEM EFFECTS - create new subcontract item')
          // convert return promise to observable
          const res = this.subcontractItemsService.createNewSubcontractItem(a.projectId, a.subcontractId)
          return res
            .pipe(
              map((item: SubcontractItem | undefined ) => {
                console.log('About to return sub item', item)
                if(item){
                  return ItemActions.createNewItemSuccess({ item: item });
                } else {
                  return ItemActions.createNewItemFailure({error: 'Undefined result returned from server'})
                }

              })
            );
        },
        onError: (action, error) => {
          console.error('Error', error);
          return ItemActions.createNewItemFailure({ error });
        },
      }
    )
  );

  private returnItems(subcontractId: string) {
    this.subcontractItemsService.getItemsForSubcontract(subcontractId).pipe(
      map((subcontractItems) =>
        ItemActions.loadSubcontractItemsSuccess({
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
