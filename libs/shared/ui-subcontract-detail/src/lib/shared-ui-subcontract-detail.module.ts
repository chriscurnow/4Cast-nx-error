
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedUiDefaultModuleCollectionModule } from '@workspace/shared-ui-default-module-collection';
import { MatDatepickerModule } from '@angular/material/datepicker'
import { SubcontractDatesComponent } from './subcontract-dates/subcontract-dates.component';
import { SubcontractHeaderComponent } from './contract-header/contract-header.component';

@NgModule({
  declarations: [SubcontractHeaderComponent, SubcontractDatesComponent],
  imports: [
    CommonModule,
    SharedUiDefaultModuleCollectionModule,
    MatDatepickerModule,
  ],
  exports: [SubcontractHeaderComponent, SubcontractDatesComponent],
})
export class SharedUiSubcontractDetailModule {}
