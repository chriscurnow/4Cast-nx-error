import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { routerReducer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { DataPersistence } from '@nrwl/angular';
import { SharedDataAccessUserModule } from '@workspace/shared/data-access-user';
import { SharedUiMainLayoutModule } from '@workspace/shared/ui-main-layout';
import { SharedUiDefaultModuleCollectionModule } from '@workspace/shared-ui-default-module-collection';
import {
  AlreadyLoggedInGuard,
  AuthGuard,
  SharedDataAccessAuthModule,
} from '@workspace/shared/data-access-auth';
import { SharedFeatureToolbarUserModule } from '@workspace/shared/feature-toolbar-user';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forRoot({
      router: routerReducer, // [STARTED DOCS] provided by NgRx
    }),
    EffectsModule.forRoot(),
    StoreDevtoolsModule,
    StoreRouterConnectingModule.forRoot(),

    // libs data access
    SharedDataAccessAuthModule,
    SharedDataAccessUserModule,

    // libs ui
    SharedUiDefaultModuleCollectionModule,
    SharedUiMainLayoutModule,

    // libs features (not lazy loaded)
    SharedFeatureToolbarUserModule,
  ],
})
export class SharedDataAccessNgrxDefaultModuleCollectionModule {}
