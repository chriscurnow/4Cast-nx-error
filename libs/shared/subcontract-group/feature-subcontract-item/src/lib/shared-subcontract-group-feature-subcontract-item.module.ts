import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedSubcontractGroupUiSubcontractItemsModule } from '@workspace/shared-subcontract-group-ui-subcontract-items';
import { SubcontractItemDetailContainerComponent } from './subcontract-item-detail-container/subcontract-item-detail-container.component';
import { SharedSubcontractGroupDataAccessSubcontractItemModule } from '@workspace/shared/subcontract-group/data-access-subcontract-item';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: 'detail/:subcontractItemId', pathMatch: 'full', component: SubcontractItemDetailContainerComponent}
    ]),
    SharedSubcontractGroupDataAccessSubcontractItemModule,
    SharedSubcontractGroupUiSubcontractItemsModule,
  ],
  declarations: [
    SubcontractItemDetailContainerComponent
  ],

})
export class SharedSubcontractGroupFeatureSubcontractItemModule {}
