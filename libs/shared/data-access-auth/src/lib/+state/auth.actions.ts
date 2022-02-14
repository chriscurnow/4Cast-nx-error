import { createAction, props } from '@ngrx/store';

import { AuthToken } from './auth.models';

export const authEffectInit = createAction('[Auth/API] Auth Effect Init');

export const authTokenUpdate = createAction(
  '[Auth/API] Auth Token Update',
  props<AuthToken>()
);

export const authInterceptorUnauthorized = createAction(
  '[Auth/API] Auth Interceptor Unauthorized'
);

export const authLogout = createAction('[Auth/Layout] Auth Logout');
