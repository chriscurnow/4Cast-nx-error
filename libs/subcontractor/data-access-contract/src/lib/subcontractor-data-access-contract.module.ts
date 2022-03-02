import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
// import * as fromContract from './+state/reducers/contract.reducer';
// import { ContractEffects } from './+state/effects/contract.effects';

@NgModule({
  imports: [
    CommonModule,
    // StoreModule.forFeature(
    //   fromContract.CONTRACT_FEATURE_KEY,
    //   fromContract.reducer
    // ),
    // EffectsModule.forFeature([ContractEffects]),
  ],
})
export class SubcontractorDataAccessContractModule {}
