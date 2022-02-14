import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { routerReducer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { DataPersistence } from '@nrwl/angular';

import {
  AlreadyLoggedInGuard,
  AuthGuard,
  SharedDataAccessAuthModule,
} from '@workspace/shared/data-access-auth';
import { SharedDataAccessUserModule } from '@workspace/shared/data-access-user';
import { SharedUiMainLayoutModule } from '@workspace/shared/ui-main-layout';
import { SharedUiDefaultModuleCollectionModule } from '@workspace/shared-ui-default-module-collection';

import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { MainNavigationComponent } from './main-navigation/main-navigation.component';
import { SharedFeatureToolbarUserModule } from '@workspace/shared/feature-toolbar-user';

@NgModule({
  declarations: [AppComponent, MainNavigationComponent],
  imports: [
    // [STARTED DOCS] following imports represent good template for other apps in the workspace

    // vendor
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,

    // ngrx
    StoreModule.forRoot(
      {
        router: routerReducer, // [STARTED DOCS] provided by NgRx
      },
      {
        // [STARTED DOCS] possible to override NgRx config
        // eg runtimeChecks https://ngrx.io/guide/store/configuration/runtime-checks
        // sometimes some of them needs to be disabled to support cyclical data structures (serializability), but preferably NOT
      }
    ),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot(),

    // [STARTED DOCS] this might cause perf issues in large APPs (DEV mode only)
    // (with lots of state in its NgRx store, eg 3+ MB of data)
    // so it might be necessary to turn it off later on
    // and only enable when debugging something specific
    !environment.production ? StoreDevtoolsModule.instrument() : [],

    // libs data access
    SharedDataAccessAuthModule,
    SharedDataAccessUserModule,

    // libs ui
    SharedUiDefaultModuleCollectionModule,
    SharedUiMainLayoutModule,

    // libs features (not lazy loaded)
    SharedFeatureToolbarUserModule,

    // routing
    RouterModule.forRoot(
      [
        {
          path: '',
          redirectTo: 'shared-feature-login',
          pathMatch: 'full',
        },
        {
          path: 'shared-feature-login',
          // [STARTED DOCS] redirects to /app if token is available
          canActivate: [AlreadyLoggedInGuard],
          loadChildren: () =>
            import('@workspace/shared/feature-login').then(
              (module) => module.SharedFeatureLoginModule
            ),
        },

        // once authenticated
        {
          path: 'app',
          // [STARTED DOCS] redirects to login if no token is available
          canActivate: [AuthGuard],
          component: MainNavigationComponent,
          children: [
            {
              path: '',
              pathMatch: 'full',
              redirectTo: 'contractor-feature-dashboard',
            },
            {
              path: 'contractor-feature-dashboard',
              loadChildren: () =>
                import('@workspace/contractor/feature-dashboard').then(
                  (module) => module.ContractorFeatureDashboardModule
                ),
            },
            {
              path: 'contractor-feature-costing',
              loadChildren: () =>
                import('@workspace/contractor/feature-costing').then(
                  (module) => module.ContractorFeatureCostingModule
                ),
            },
          ],
        },
        // [STARTER DOCS] catch all route, redirect to /app (and its default route)
        // possible to provide dedicated not found page instead
        {
          path: '**',
          redirectTo: 'app'
        }
      ],
      { initialNavigation: 'enabledBlocking' }
    ),
  ],
  // [STARTER DOCS] DataPersistence has to be provided in every app that uses NgRx
  providers: [DataPersistence],
  bootstrap: [AppComponent],
})
export class AppModule {}
