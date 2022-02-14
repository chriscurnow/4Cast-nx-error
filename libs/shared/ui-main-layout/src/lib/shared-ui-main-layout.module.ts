import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatToolbarModule } from '@angular/material/toolbar';

import { MainLayoutComponent } from './main-layout/main-layout.component';

@NgModule({
  imports: [
    // vendor
    CommonModule,
    RouterModule,

    // material
    MatToolbarModule,
  ],
  declarations: [MainLayoutComponent],
  exports: [MainLayoutComponent],
})
export class SharedUiMainLayoutModule {}
