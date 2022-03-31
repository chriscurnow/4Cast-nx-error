import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubcontractItemsContainerComponent } from './subcontract-items-container/subcontract-items-container.component';
import { SubcontractItemDetailComponent } from './subcontract-item-detail/subcontract-item-detail.component';
import { SubcontractItemListComponent } from './subcontract-item-list/subcontract-item-list.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    SubcontractItemsContainerComponent,
    SubcontractItemDetailComponent,
    SubcontractItemListComponent
  ],
})
export class SharedUiSubcontractItemsModule {}
