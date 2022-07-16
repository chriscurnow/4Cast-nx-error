import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { SharedFeatureToolbarUserModule } from '@workspace/shared/feature-toolbar-user';
import { MainLayoutComponent } from './main-layout/main-layout.component';

@NgModule({
  imports: [
    // vendor
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,

    // material
    MatToolbarModule,
    SharedFeatureToolbarUserModule,
  ],
  declarations: [MainLayoutComponent],
  exports: [MainLayoutComponent],
})
export class SharedUiMainLayoutModule {}
