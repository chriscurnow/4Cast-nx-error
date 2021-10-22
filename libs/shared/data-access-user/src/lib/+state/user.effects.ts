import { Injectable } from '@angular/core';
import { createEffect, Actions } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/angular';
import { map } from 'rxjs/operators';

import * as UserActions from './user.actions';
import * as UserFeature from './user.reducer';
import { UserService } from '../user.service';

@Injectable()
export class UserEffects {
  init$ = createEffect(() =>
    this.dataPersistence.fetch(UserActions.loadUser, {
      run: (
        action: ReturnType<typeof UserActions.loadUser>,
        state: UserFeature.UserPartialState
      ) => {
        return this.userService
          .getUser()
          .pipe(map((user) => UserActions.loadUserSuccess({ user })));
      },
      onError: (action: ReturnType<typeof UserActions.loadUser>, error) => {
        console.error('Error', error);
        return UserActions.loadUserFailure({ error });
      },
    })
  );

  constructor(
    private readonly actions$: Actions,
    private readonly dataPersistence: DataPersistence<UserFeature.UserPartialState>,
    private readonly userService: UserService
  ) {}
}
