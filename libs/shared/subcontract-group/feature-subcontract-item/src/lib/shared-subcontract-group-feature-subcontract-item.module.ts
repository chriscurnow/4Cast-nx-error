import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedUiDefaultModuleCollectionModule } from '@workspace/shared-ui-default-module-collection';
import { SharedUiSubcontractItemsModule } from '@workspace/shared-subcontract-group-ui-subcontract-items';
import { SubcontractItemDetailContainerComponent } from './subcontract-item-detail-container/subcontract-item-detail-container.component';
import { SharedSubcontractGroupDataAccessSubcontractItemModule } from '@workspace/shared/subcontract-group/data-access-subcontract-item';
import { SubcontractItemsListContainerComponent } from './subcontract-items-list-container/subcontract-items-list-container.component';
import { VariationsContainerComponent } from './variations-container/variations-container.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: VariationsContainerComponent,
        children: [
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'list',
          },
          {
            path: 'list/for-subcontract',
            component: SubcontractItemsListContainerComponent
          },
          {
            path: 'list',
            component: SubcontractItemsListContainerComponent,
          },
          {
            path: 'detail/:subcontractItemId',
            component: SubcontractItemDetailContainerComponent,
          },
        ],
      },
    ]),
    SharedSubcontractGroupDataAccessSubcontractItemModule,
    SharedUiSubcontractItemsModule,
    SharedUiDefaultModuleCollectionModule,
  ],
  declarations: [
    SubcontractItemDetailContainerComponent,
    SubcontractItemsListContainerComponent,
    VariationsContainerComponent,
  ],
  exports: [SubcontractItemsListContainerComponent],
})
export class SharedSubcontractGroupFeatureSubcontractItemModule {}
