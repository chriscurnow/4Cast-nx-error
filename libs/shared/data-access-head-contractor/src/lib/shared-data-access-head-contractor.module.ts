import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromHeadContractor from './+state/head-contractor.reducer';
import { HeadContractorEffects } from './+state/head-contractor.effects';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromHeadContractor.HEAD_CONTRACTOR_FEATURE_KEY,
      fromHeadContractor.reducer
    ),
    EffectsModule.forFeature([HeadContractorEffects]),
  ],
})
export class SharedDataAccessHeadContractorModule {}
