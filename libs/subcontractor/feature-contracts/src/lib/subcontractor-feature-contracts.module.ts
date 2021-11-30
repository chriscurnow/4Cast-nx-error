import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ContractListPageComponent } from './contract-list-page/contract-list-page.component';
import { SubcontractorDataAccessContractModule } from '@workspace/subcontractor/data-access-contract';

import { SharedUiDefaultModuleCollectionModule } from '@workspace/shared-ui-default-module-collection';

@NgModule({
  imports: [
    CommonModule,
    SubcontractorDataAccessContractModule,
    SharedUiDefaultModuleCollectionModule,
    RouterModule.forChild([
      {path: '', redirectTo: 'contractsList', pathMatch: 'full'},
      { path: 'contractsList', component: ContractListPageComponent}
    ]),
  ],
  declarations: [
    ContractListPageComponent
  ],
})
export class SubcontractorFeatureContractsModule {}
