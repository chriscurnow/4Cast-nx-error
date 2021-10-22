import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DashboardContainerComponent } from './dashboard-container/dashboard-container.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: DashboardContainerComponent },
    ]),
  ],
  declarations: [DashboardContainerComponent],
})
export class ContractorFeatureDashboardModule {}
