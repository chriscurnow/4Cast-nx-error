import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


import { SharedSubcontractGroupUiSubcontractDetailModule } from '@workspace/shared-subcontract-group-ui-subcontract-detail';
import { SharedSubcontractGroupUiSubcontractItemsModule } from '@workspace/shared-subcontract-group-ui-subcontract-items';
import { SharedUiDefaultModuleCollectionModule } from '@workspace/shared-ui-default-module-collection';
import { MatTableModule } from '@angular/material/table';
import { SharedDataAccessSubcontractModule } from '@workspace/shared/data-access-subcontract';
import { SharedDataAccessSubcontractItemsModule } from '@workspace/shared/data-access-subcontract-items';
import { SubcontractListContainerComponent } from './subcontract-list';
import { SubcontractDetailContainerComponent } from './subcontract-detail';
import { SubcontractItemsContainerComponent } from './subcontract-detail/subcontract-items-container/subcontract-items-container.component';

import { SubcontractListComponent } from './subcontract-list';
import { SubcontractDetailComponent } from './subcontract-detail';
import { SubcontractItemsComponent } from './subcontract-items/subcontract-items.component';

@NgModule({
  imports: [
    CommonModule,
    SharedUiDefaultModuleCollectionModule,
    SharedSubcontractGroupUiSubcontractItemsModule,
    SharedSubcontractGroupUiSubcontractDetailModule,
    SharedDataAccessSubcontractModule,
    SharedDataAccessSubcontractItemsModule,
    MatTableModule,
    RouterModule.forChild([
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'contracts-list'
      },
      {
        path: 'contracts-list', component: SubcontractListContainerComponent
      },
      { path: 'contract-detail/:contractId', component: SubcontractDetailContainerComponent}
    ]),
  ],
  declarations: [
    SubcontractListContainerComponent,
    SubcontractDetailContainerComponent,
    SubcontractListComponent,
    SubcontractDetailComponent,
    SubcontractItemsComponent,
    SubcontractItemsContainerComponent,
  ],
})
export class SharedSubcontractGroupFeatureSubcontractModule {}
