import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MainNavigationComponent } from './main-navigation/main-navigation.component';
import {
  AlreadyLoggedInGuard,
  AuthGuard,
  SharedDataAccessAuthModule,
} from '@workspace/shared/data-access-auth';

@NgModule({
  imports: [
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
              redirectTo: 'subcontractor-feature-contracts',
            },
            {
              path: 'subcontractor-feature-contracts',
              loadChildren: () =>
                import('@workspace/subcontractor/feature-contracts').then(
                  (module) => module.SubcontractorFeatureContractsModule
                ),
            },
          ],
        },
        // [STARTER DOCS] catch all route, redirect to /app (and its default route)
        // possible to provide dedicated not found page instead
        {
          path: '**',
          redirectTo: 'app',
        },
      ],
      { initialNavigation: 'enabledBlocking' }
    ),
  ],
})
export class AppRoutes {}
