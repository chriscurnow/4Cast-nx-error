import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { ContractListPageComponent } from './contract-list-page/contract-list-page.component';
import { SharedDataAccessSubcontractModule } from '@workspace/shared/data-access-subcontract';

import { SharedUiDefaultModuleCollectionModule } from '@workspace/shared-ui-default-module-collection';
import { ContractDetailComponent } from './contract-detail/contract-detail.component';
import { ContractHeaderComponent } from './shared-forms/contract-header/contract-header.component';
import { ContractListViewComponent } from './contract-list-page/contract-list-view/contract-list-view.component';


@NgModule({
  imports: [
    CommonModule,
    SharedDataAccessSubcontractModule,
    SharedUiDefaultModuleCollectionModule,

    RouterModule.forChild([
      { path: '', redirectTo: 'contracts-list', pathMatch: 'full' },
      { path: 'contracts-list', component: ContractListPageComponent },
      {
        path: 'contract-detail/:contractId',
        component: ContractDetailComponent,
      },
    ]),
  ],
  declarations: [
    ContractListPageComponent,
    ContractDetailComponent,
    // ContractDatesComponent,
    ContractHeaderComponent,
    ContractListViewComponent,

  ],
})
export class SubcontractorFeatureContractsModule {}
