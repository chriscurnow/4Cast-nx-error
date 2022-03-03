import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CostingContainerComponent } from './costing-container/costing-container.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: CostingContainerComponent },
    ]),
  ],
  declarations: [CostingContainerComponent],
})
export class ContractorFeatureCostingModule {}
