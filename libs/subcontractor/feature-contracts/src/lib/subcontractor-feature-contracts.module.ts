import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { ContractListPageComponent } from './contract-list-page/contract-list-page.component';
import { SubcontractorDataAccessContractModule } from '@workspace/subcontractor/data-access-contract';

import { SharedUiDefaultModuleCollectionModule } from '@workspace/shared-ui-default-module-collection';
import { ContractDetailComponent } from './contract-detail/contract-detail.component';



@NgModule({
  imports: [
    CommonModule,
    SubcontractorDataAccessContractModule,
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
  declarations: [ContractListPageComponent, ContractDetailComponent],
})
export class SubcontractorFeatureContractsModule {}
