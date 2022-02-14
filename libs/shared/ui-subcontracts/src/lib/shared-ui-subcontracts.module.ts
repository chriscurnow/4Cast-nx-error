import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContractDatesComponent } from './contract-dates/contract-dates.component';
import { ContractHeaderComponent } from './contract-header/contract-header.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    ContractDatesComponent,
    ContractHeaderComponent
  ],
})
export class SharedUiSubcontractsModule {}
