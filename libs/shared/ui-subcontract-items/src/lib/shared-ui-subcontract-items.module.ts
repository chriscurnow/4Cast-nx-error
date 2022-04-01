import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubcontractItemsContainerComponent } from './subcontract-items-container/subcontract-items-container.component';
import { SubcontractItemDetailComponent } from './subcontract-item-detail/subcontract-item-detail.component';
import { SubcontractItemListComponent } from './subcontract-item-list/subcontract-item-list.component';
import { SharedUiDefaultModuleCollectionModule } from '@workspace/shared-ui-default-module-collection';

@NgModule({
  imports: [CommonModule, SharedUiDefaultModuleCollectionModule],
  declarations: [
    SubcontractItemsContainerComponent,
    SubcontractItemDetailComponent,
    SubcontractItemListComponent,
  ],
  exports: [
    SubcontractItemsContainerComponent,
    SubcontractItemDetailComponent,
    SubcontractItemListComponent,
  ],
})
export class SharedUiSubcontractItemsModule {}
