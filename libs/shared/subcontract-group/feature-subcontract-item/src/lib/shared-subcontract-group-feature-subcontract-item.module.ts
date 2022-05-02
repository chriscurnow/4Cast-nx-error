import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedSubcontractGroupUiSubcontractItemsModule } from '@workspace/shared-subcontract-group-ui-subcontract-items';
import { SubcontractItemDetailContainerComponent } from './subcontract-item-detail-container/subcontract-item-detail-container.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      /* {path: '', pathMatch: 'full', component: InsertYourComponentHere} */
    ]),
    SharedSubcontractGroupUiSubcontractItemsModule,
  ],
  declarations: [
    SubcontractItemDetailContainerComponent
  ],
  
})
export class SharedSubcontractGroupFeatureSubcontractItemModule {}
