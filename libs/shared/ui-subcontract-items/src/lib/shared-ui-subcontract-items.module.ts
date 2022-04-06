import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubcontractItemsContainerComponent } from './subcontract-items-container/subcontract-items-container.component';
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
    SubcontractItemsContainerComponent,
    SubcontractItemLineComponent,
    SubcontractItemListComponent,
    // CurrencyDirective,
  ],
  exports: [
    SharedUtilModule,
    SubcontractItemsContainerComponent,
    SubcontractItemLineComponent,
    SubcontractItemListComponent,
    // CurrencyDirective,
  ],
})
export class SharedUiSubcontractItemsModule {}
