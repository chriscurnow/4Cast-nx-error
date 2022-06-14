import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedUiDefaultModuleCollectionModule } from '@workspace/shared-ui-default-module-collection';
import { SharedUiSubcontractDetailModule } from '@workspace/shared-subcontract-group-ui-subcontract-detail';
import { SubcontractDetailRoutingModule } from './subcontract-detail-routing.module';
import { SharedUiSubcontractItemsModule } from '@workspace/shared-subcontract-group-ui-subcontract-items';
import { SubcontractDetailUIComponent } from './subcontract-detail-component/subcontract-detail-ui/subcontract-detail-ui.component';
import { SubcontractDetailContainerComponent } from './subcontract-detail-component/subcontract-detail-container/subcontract-detail-container.component';
import { GeneralDetailsContainerComponent } from './general-details/general-details-container/general-details-container.component';
import { GeneralDetailsUIComponent } from './general-details/general-details-ui/general-details-ui.component';
import { SubcontractItemsContainerComponent } from './subcontract-items-container/subcontract-items-container.component';


@NgModule({
  declarations: [
    SubcontractDetailContainerComponent,
    SubcontractDetailUIComponent,
    GeneralDetailsContainerComponent,
    GeneralDetailsUIComponent,
    SubcontractItemsContainerComponent,
  ],
  imports: [
    CommonModule,
    SharedUiSubcontractDetailModule,
    SharedUiDefaultModuleCollectionModule,
    SubcontractDetailRoutingModule,
    SharedUiSubcontractItemsModule,
  ],
})
export class SubcontractDetailModule {}
