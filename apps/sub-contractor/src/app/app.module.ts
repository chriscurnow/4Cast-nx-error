import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { routerReducer, StoreRouterConnectingModule, DefaultRouterStateSerializer } from '@ngrx/router-store';
import { AngularFireModule } from '@angular/fire/compat';
import {
  AngularFirestore,
  SETTINGS as FIRESTORE_SETTINGS,
} from '@angular/fire/compat/firestore';
import {
  AngularFireDatabaseModule,
  URL as DATABASE_URL,
} from '@angular/fire/compat/database';
import { ORIGIN } from '@angular/fire/compat/functions';
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
import { AppRoutes } from './app.routes';

const shouldUseEmulator = () => false;

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
        runtimeChecks: {
          strictActionImmutability: false,
          strictActionSerializability: true,
          strictActionTypeUniqueness: true,
          strictActionWithinNgZone: true,
          strictStateImmutability: false,
          strictStateSerializability: false, // this isn't enabled by default, but I had it enabled in a project.
        },
        // [STARTED DOCS] possible to override NgRx config
        // eg runtimeChecks https://ngrx.io/guide/store/configuration/runtime-checks
        // sometimes some of them needs to be disabled to support cyclical data structures (serializability), but preferably NOT
      }
    ),
    EffectsModule.forRoot([]),
    // StoreRouterConnectingModule.forRoot(),
    StoreRouterConnectingModule.forRoot({
      serializer: DefaultRouterStateSerializer,
    }),
    // [STARTED DOCS] this might cause perf issues in large APPs (DEV mode only)
    // (with lots of state in its NgRx store, eg 3+ MB of data)
    // so it might be necessary to turn it off later on
    // and only enable when debugging something specific
    !environment.production ? StoreDevtoolsModule.instrument() : [],

    AngularFireModule.initializeApp(environment.firebaseConfig),

    // libs data access
    SharedDataAccessAuthModule,
    SharedDataAccessUserModule,

    // libs ui
    SharedUiDefaultModuleCollectionModule,
    SharedUiMainLayoutModule,

    // libs features (not lazy loaded)
    SharedFeatureToolbarUserModule,
    AppRoutes,
    // routing
  ],
  // [STARTER DOCS] DataPersistence has to be provided in every app that uses NgRx
  providers: [
    DataPersistence,
    AngularFirestore,
    {
      provide: DATABASE_URL,
      useFactory: () =>
        shouldUseEmulator()
          ? `http://localhost:9000?ns=${environment.firebaseConfig.projectId}`
          : undefined,
    },
    {
      provide: FIRESTORE_SETTINGS,
      useValue: { host: 'localhost:8080', ssl: false },
    },
    { provide: ORIGIN, useValue: 'http://localhost:4001' }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
