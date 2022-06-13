import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { SubcontractItemLineComponent } from './subcontract-item-line/subcontract-item-line.component';
import { SubcontractItemListUIComponent } from './subcontract-item-list/subcontract-item-list.component';
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
    SubcontractItemListUIComponent,
    SubcontractItemDetailUiComponent,
    // CurrencyDirective,
  ],
  exports: [
    SharedUtilModule,
    SubcontractItemLineComponent,
    SubcontractItemListUIComponent,
    SubcontractItemDetailUiComponent,
    // CurrencyDirective,
  ],
})
export class SharedUiSubcontractItemsModule {}
