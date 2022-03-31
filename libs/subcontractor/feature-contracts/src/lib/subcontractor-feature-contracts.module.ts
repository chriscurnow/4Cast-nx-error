import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';

import { SharedDataAccessSubcontractModule } from '@workspace/shared/data-access-subcontract';
import { SharedDataAccessSubcontractItemsModule } from '@workspace/shared/data-access-subcontract-items';
import { MatTableModule } from '@angular/material/table';
import { SharedUiDefaultModuleCollectionModule } from '@workspace/shared-ui-default-module-collection';
import {
  SubcontractListContainerComponent,
  SubcontractListComponent,
} from './subcontract-list';
import {
  SubcontractDetailContainerComponent,
  SubcontractDetailComponent,
  LineItemsComponent,
  SubontractItemArrayComponent,
} from './subcontract-detail';
import { SharedUiSubcontractDetailModule } from '@workspace/shared/ui-subcontract-detail';
import { SharedUiSubcontractItemsModule } from '@workspace/shared/ui-subcontract-items';

@NgModule({
  imports: [
    CommonModule,
    SharedDataAccessSubcontractModule,
    SharedDataAccessSubcontractItemsModule,
    SharedUiSubcontractItemsModule,
    SharedUiDefaultModuleCollectionModule,
    MatTableModule,
    SharedUiSubcontractDetailModule,
    RouterModule.forChild([
      { path: '', redirectTo: 'contracts-list', pathMatch: 'full' },
      { path: 'contracts-list', component: SubcontractListContainerComponent },
      {
        path: 'contract-detail/:contractId',
        component: SubcontractDetailContainerComponent,
        // loadChildren: () =>
        //   import('@workspace/shared/ui-subcontract-detail').then(
        //     (module) => module.SharedUiSubcontractDetailModule
        //   ),
      },

    ]),
  ],
  declarations: [
    SubcontractListContainerComponent,
    SubcontractListComponent,
    SubcontractDetailContainerComponent,
    SubcontractDetailComponent,
    LineItemsComponent,
    SubontractItemArrayComponent,

  ],
})
export class SubcontractorFeatureContractsModule {}
