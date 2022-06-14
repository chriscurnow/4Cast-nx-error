import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedUiDefaultModuleCollectionModule } from '@workspace/shared-ui-default-module-collection';
import { MatTableModule } from '@angular/material/table';

import { UiSubcontractListComponent } from './ui-subcontract-list/ui-subcontract-list.component';


@NgModule({
  imports: [
    CommonModule,
    SharedUiDefaultModuleCollectionModule,
    MatTableModule,
  ],
  declarations: [UiSubcontractListComponent],
  exports: [UiSubcontractListComponent],
})
export class SharedSubcontractGroupUiSubcontractModule {}
