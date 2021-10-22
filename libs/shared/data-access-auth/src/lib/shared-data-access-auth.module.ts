import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import * as fromAuth from './+state/auth.reducer';
import { AuthEffects } from './+state/auth.effects';

import { JwtTokenInterceptorInterceptor } from './jwt-token-interceptor.interceptor';

@NgModule({
  imports: [
    StoreModule.forFeature(fromAuth.AUTH_FEATURE_KEY, fromAuth.reducer),
    EffectsModule.forFeature([AuthEffects]),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtTokenInterceptorInterceptor,
      multi: true,
    },
  ],
})
export class SharedDataAccessAuthModule {}
