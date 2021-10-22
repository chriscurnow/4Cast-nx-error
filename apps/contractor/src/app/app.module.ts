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
    // vendor
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    StoreModule.forRoot(
      {
        router: routerReducer, // provided by NgRx
      },
      {
        // possible to override NgRx config
        // eg runtimeChecks
      }
    ),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot(),

    // this might cause perf issues in large APPs (DEV mode only)
    // so it might be necessary to turn it off
    // and only enable when debugging something specific
    !environment.production ? StoreDevtoolsModule.instrument() : [],

    // libs data access
    SharedDataAccessAuthModule,
    SharedDataAccessUserModule,

    // libs ui
    SharedUiDefaultModuleCollectionModule,
    SharedUiMainLayoutModule,

    // libs features
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
          canActivate: [AlreadyLoggedInGuard],
          loadChildren: () =>
            import('@workspace/shared/feature-login').then(
              (module) => module.SharedFeatureLoginModule
            ),
        },

        // once authenticated
        {
          path: 'app',
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
      ],
      { initialNavigation: 'enabledBlocking' }
    ),
  ],
  providers: [DataPersistence],
  bootstrap: [AppComponent],
})
export class AppModule {}
