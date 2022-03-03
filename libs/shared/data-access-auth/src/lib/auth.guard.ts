import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { selectIsAuthenticated } from './+state/auth.selectors';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private store: Store) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.store.pipe(
      select(selectIsAuthenticated),
      map((isAuthenticated) => {
        if (isAuthenticated) {
          return true;
        } else {
          return this.router.createUrlTree(['/shared-feature-login'], {
            queryParams: { unauthorized: true },
          });
        }
      })
    );
  }
}
