import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


import { SharedSubcontractGroupUiSubcontractDetailModule } from '@workspace/shared-subcontract-group-ui-subcontract-detail';
import { SharedSubcontractGroupUiSubcontractItemsModule } from '@workspace/shared-subcontract-group-ui-subcontract-items';
import { SharedUiDefaultModuleCollectionModule } from '@workspace/shared-ui-default-module-collection';
import { MatTableModule } from '@angular/material/table';
import { SharedSubcontractGroupDataAccessSubcontractModule } from '@workspace/shared/subcontract-group/data-access-subcontract';
import { SharedSubcontractGroupDataAccessSubcontractItemModule } from '@workspace/shared/subcontract-group/data-access-subcontract-item';
import { SubcontractListContainerComponent } from './subcontract-list';
import { SubcontractDetailContainerComponent } from './subcontract-detail';
import { SubcontractItemsContainerComponent } from './subcontract-detail/subcontract-items-container/subcontract-items-container.component';

import { SubcontractListComponent } from './subcontract-list';
import { SubcontractDetailComponent } from './subcontract-detail';
import { SubcontractItemsComponent } from './subcontract-items/subcontract-items.component';
import { SubcontractOriginalItemContainerComponent } from './subcontract-detail/subcontract-original-item-container/subcontract-original-item-container.component';
import { SubcontractVariationsItemsContainerComponent } from './subcontract-detail/subcontract-variations-items-container/subcontract-variations-items-container.component';
import { SubcontractDetailVariationContainerComponent } from './subcontract-detail-variation-container/subcontract-detail-variation-container.component';
import { ContractDetailComponent } from './subcontract-detail/contract-detail/contract-detail.component';
import { ContractGeneralDetailComponent } from './subcontract-detail/contract-general-detail/contract-general-detail.component';
import { ContractGeneralDetailContainerComponent } from './subcontract-detail/contract-general-detail-container/contract-general-detail-container.component';

@NgModule({
  imports: [
    CommonModule,
    SharedUiDefaultModuleCollectionModule,
    SharedSubcontractGroupUiSubcontractItemsModule,
    SharedSubcontractGroupUiSubcontractDetailModule,
    SharedSubcontractGroupDataAccessSubcontractModule,
    SharedSubcontractGroupDataAccessSubcontractItemModule,

    MatTableModule,
    RouterModule.forChild([
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'contracts-list',
      },
      {
        path: 'contracts-list',
        component: SubcontractListContainerComponent,
      },
      {
        path: 'project/:projectId/contract-detail/:contractId',  component: SubcontractDetailContainerComponent,
        children:[
          { path: '', redirectTo: 'general-details'},
          { path: 'general-details', component: ContractGeneralDetailContainerComponent },
          { path: 'variations',

        loadChildren: () =>
              import(
                `@workspace/shared/subcontract-group/feature-subcontract-item`
              ).then(
                (module) => module.SharedSubcontractGroupFeatureSubcontractItemModule
              )
              }
    ]}
  ])
],
  declarations: [
    SubcontractListContainerComponent,
    SubcontractDetailContainerComponent,
    SubcontractListComponent,
    SubcontractDetailComponent,
    SubcontractItemsComponent,
    SubcontractItemsContainerComponent,
    SubcontractOriginalItemContainerComponent,
    SubcontractVariationsItemsContainerComponent,
    SubcontractDetailVariationContainerComponent,
    ContractDetailComponent,
    ContractGeneralDetailComponent,
    ContractGeneralDetailContainerComponent,
  ],
})
export class SharedSubcontractGroupFeatureSubcontractModule {}
