import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedUiDefaultModuleCollectionModule } from '@workspace/shared-ui-default-module-collection';
import { SubcontractDetailRoutingModule } from './subcontract-detail-routing.module';
import { SharedUiSubcontractItemsModule } from '@workspace/shared-subcontract-group-ui-subcontract-items';
import { SubcontractItemsContainerComponent } from './subcontract-items-container/subcontract-items-container.component';


@NgModule({
  declarations: [
    SubcontractItemsContainerComponent,
  ],
  imports: [
    CommonModule,
    SharedUiDefaultModuleCollectionModule,
    SubcontractDetailRoutingModule,
    SharedUiSubcontractItemsModule,
  ],
})
export class SubcontractDetailModule {}
