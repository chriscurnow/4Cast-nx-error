import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubcontractDetailRoutingModule } from './subcontract-detail-routing.module';
import { SubcontractDetailComponent } from './subcontract-detail/subcontract-detail.component';
import { LineItemsComponent } from './line-items/line-items.component';
import { ContractItemComponent } from './contract-item/contract-item.component';
import { ContractItemArrayComponent } from './contract-item-array/contract-item-array.component';


@NgModule({
  declarations: [
    SubcontractDetailComponent,
    LineItemsComponent,
    ContractItemComponent,
    ContractItemArrayComponent
  ],
  imports: [
    CommonModule,
    SubcontractDetailRoutingModule
  ]
})
export class SubcontractDetailModule { }
