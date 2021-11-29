import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      [
        {
          path: 'subcontractor-feature-dashboard',
          loadChildren: () =>
            import('@workspace/subcontractor/feature-dashboard').then(
              (module) => module.SubcontractorFeatureDashboardModule
            ),
        },
        {
          path: 'subcontractor-feature-contracts',
          loadChildren: () =>
            import('@workspace/subcontractor/feature-contracts').then(
              (module) => module.SubcontractorFeatureContractsModule
            ),
        },
      ],
      { initialNavigation: 'enabledBlocking' }
    ),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
