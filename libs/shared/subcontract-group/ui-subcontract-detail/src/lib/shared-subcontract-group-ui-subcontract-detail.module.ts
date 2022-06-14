import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedUiDefaultModuleCollectionModule } from '@workspace/shared-ui-default-module-collection';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SubcontractDatesComponent } from './subcontract-dates/subcontract-dates.component';
import { SubcontractHeaderComponent } from './contract-header/contract-header.component';
import { SubcontractItemComponent } from './subcontract-item/subcontract-item.component';
import { CurrencyUtilitiesModule } from '@workspace/shared/util';

@NgModule({
  declarations: [
    SubcontractHeaderComponent,
    SubcontractDatesComponent,
    SubcontractItemComponent,
  ],
  imports: [
    CommonModule,
    SharedUiDefaultModuleCollectionModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    CurrencyUtilitiesModule,
  ],
  exports: [
    SubcontractHeaderComponent,
    SubcontractDatesComponent,
    SubcontractItemComponent,
  ],
})
export class SharedUiSubcontractDetailModule {}
