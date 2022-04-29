import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubcontractItemLineComponent } from './subcontract-item-line/subcontract-item-line.component';
import { SubcontractItemListComponent } from './subcontract-item-list/subcontract-item-list.component';
import { SharedUiDefaultModuleCollectionModule } from '@workspace/shared-ui-default-module-collection';
import { SharedUtilModule } from '@workspace/shared/util';

@NgModule({
  imports: [
    CommonModule,
    SharedUiDefaultModuleCollectionModule,
    SharedUtilModule,
  ],
  declarations: [
    SubcontractItemLineComponent,
    SubcontractItemListComponent,
    // CurrencyDirective,
  ],
  exports: [
    SharedUtilModule,
    SubcontractItemLineComponent,
    SubcontractItemListComponent,
    // CurrencyDirective,
  ],
})
export class SharedSubcontractGroupUiSubcontractItemsModule {}
