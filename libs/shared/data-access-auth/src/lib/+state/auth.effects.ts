import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { createEffect, Actions, ofType, OnInitEffects } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { concatMap, tap } from 'rxjs/operators';

import { LocalStorageService } from '@workspace/shared/util-local-storage';

import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects implements OnInitEffects {
  retrieveTokenFromLocalStorage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.authEffectInit),
      concatMap(() => {
        const token = this.localStorageService.getAuthToken();
        if (token) {
          return of(AuthActions.authTokenUpdate({ token }));
        } else {
          return EMPTY;
        }
      })
    )
  );

  updateTokenInLocalStorage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.authTokenUpdate),
        tap(({ token }) => {
          if (token) {
            this.localStorageService.storeAuthToken(token);
          } else if (token === null || token === undefined) {
            this.localStorageService.removeAuthToken();
          }
        })
      ),
    { dispatch: false }
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.authLogout),
        tap(() => {
          this.localStorageService.removeAuthToken();
          this.router.navigateByUrl('/');
        })
      ),
    { dispatch: false }
  );

  constructor(
    private readonly actions$: Actions,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {}

  ngrxOnInitEffects(): Action {
    return AuthActions.authEffectInit();
  }
}
