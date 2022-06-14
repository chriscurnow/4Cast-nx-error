import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedUiDefaultModuleCollectionModule } from '@workspace/shared-ui-default-module-collection';
import { MatTableModule } from '@angular/material/table';
import { SharedSubcontractGroupDataAccessSubcontractModule } from '@workspace/shared/subcontract-group/data-access-subcontract';
import { SharedSubcontractGroupDataAccessSubcontractItemModule } from '@workspace/shared/subcontract-group/data-access-subcontract-item';
import { SubcontractListContainerComponent } from './subcontract-list/subcontract-list-container/subcontract-list-container.component';
import { SubcontractListUIComponent } from './subcontract-list/subcontract-list-ui/subcontract-list-ui.component';

@NgModule({
  imports: [
    CommonModule,
    SharedUiDefaultModuleCollectionModule,
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
        path: 'detail/:subcontractId',
        loadChildren: () =>
          import('./subcontract-detail/subcontract-detail.module').then(
            (m) => m.SubcontractDetailModule
          ),
      },
    ]),
  ],
  declarations: [SubcontractListContainerComponent, SubcontractListUIComponent],
})
export class SharedSubcontractGroupFeatureSubcontractModule {}
