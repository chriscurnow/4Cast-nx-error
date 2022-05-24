import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { SubcontractItemLineComponent } from './subcontract-item-line/subcontract-item-line.component';
import { SubcontractItemListComponent } from './subcontract-item-list/subcontract-item-list.component';
import { SharedUiDefaultModuleCollectionModule } from '@workspace/shared-ui-default-module-collection';
import { SharedUtilModule } from '@workspace/shared/util';
import { SubcontractItemDetailUiComponent } from './subcontract-item-detail-ui/subcontract-item-detail-ui.component';

@NgModule({
  imports: [
    CommonModule,
    SharedUiDefaultModuleCollectionModule,
    SharedUtilModule,
    MatDatepickerModule,
  ],
  declarations: [
    SubcontractItemLineComponent,
    SubcontractItemListComponent,
    SubcontractItemDetailUiComponent,
    // CurrencyDirective,
  ],
  exports: [
    SharedUtilModule,
    SubcontractItemLineComponent,
    SubcontractItemListComponent,
    SubcontractItemDetailUiComponent,
    // CurrencyDirective,
  ],
})
export class SharedSubcontractGroupUiSubcontractItemsModule {}
