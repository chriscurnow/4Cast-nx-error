import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { EMPTY, Observable, of, throwError } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { catchError, concatMap, take } from 'rxjs/operators';

import { selectAuthToken } from './+state/auth.selectors';
import { authInterceptorUnauthorized } from './+state/auth.actions';

@Injectable()
export class JwtTokenInterceptorInterceptor implements HttpInterceptor {
  constructor(private store: Store) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return this.store.pipe(
      select(selectAuthToken),
      take(1),
      concatMap((token) => {
        if (token) {
          return of(
            request.clone({
              headers: request.headers.set('Authorization', 'Bearer ' + token),
            })
          );
        } else {
          return of(request);
        }
      }),
      concatMap((request) =>
        next.handle(request).pipe(
          catchError((error: HttpErrorResponse) => {
            if (error.status === 401) {
              this.store.dispatch(authInterceptorUnauthorized());
            }
            return throwError(error);
          })
        )
      )
    );
  }
}
