import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContractDatesComponent } from './contract-dates/contract-dates.component';
import { FcastFormsModule } from 'src/app/shared/fcst-forms/fcst-forms.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ContractHeaderComponent } from './contract-header/contract-header.component';

@NgModule({
  declarations: [
      ContractDatesComponent,
      ContractHeaderComponent
    ],
  imports: [
    CommonModule,
    FcastFormsModule,
    MatDatepickerModule
  ],
  exports: [
    ContractDatesComponent,
    FcastFormsModule,
    ContractHeaderComponent
  ]
})
export class SharedFormsModule { }
