
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedUiDefaultModuleCollectionModule } from '@workspace/shared-ui-default-module-collection';
import { SubcontractDetailRoutingModule } from './subcontract-detail-routing.module';
import { SubcontractDetailComponent } from './subcontract-detail/subcontract-detail/subcontract-detail.component';
import { LineItemsComponent } from './subcontract-detail/line-items/line-items.component';
import { ContractItemComponent } from './subcontract-detail/contract-item/contract-item.component';
import { ContractItemArrayComponent } from './subcontract-detail/contract-item-array/contract-item-array.component';
import { ContractHeaderComponent } from './contract-header/contract-header.component';

@NgModule({
  declarations: [
    SubcontractDetailComponent,
    LineItemsComponent,
    ContractItemComponent,
    ContractItemArrayComponent,
    ContractHeaderComponent,
  ],
  imports: [
    CommonModule,
    SubcontractDetailRoutingModule,
    SharedUiDefaultModuleCollectionModule,
  ],
})
export class SharedUiSubcontractDetailModule {}
