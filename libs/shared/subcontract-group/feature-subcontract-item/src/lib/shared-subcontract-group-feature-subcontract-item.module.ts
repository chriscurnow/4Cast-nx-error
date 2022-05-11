import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedSubcontractGroupUiSubcontractItemsModule } from '@workspace/shared-subcontract-group-ui-subcontract-items';
import { SubcontractItemDetailContainerComponent } from './subcontract-item-detail-container/subcontract-item-detail-container.component';
import { SharedSubcontractGroupDataAccessSubcontractItemModule } from '@workspace/shared/subcontract-group/data-access-subcontract-item';
import { SubcontractItemListComponent } from './subcontract-item-list/subcontract-item-list.component';
import { SubcontractItemsListContainerComponent } from './subcontract-items-list-container/subcontract-items-list-container.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', redirectTo: 'items-list' },
      {
        path: 'items-list',
        pathMatch: 'full',
        component: SubcontractItemsListContainerComponent,
      },
      {
        path: 'detail/:subcontractItemId',
        pathMatch: 'full',
        component: SubcontractItemDetailContainerComponent,
      },
    ]),
    SharedSubcontractGroupDataAccessSubcontractItemModule,
    SharedSubcontractGroupUiSubcontractItemsModule,
  ],
  declarations: [
    SubcontractItemDetailContainerComponent,
    SubcontractItemListComponent,
    SubcontractItemsListContainerComponent,
  ],
})
export class SharedSubcontractGroupFeatureSubcontractItemModule {}
