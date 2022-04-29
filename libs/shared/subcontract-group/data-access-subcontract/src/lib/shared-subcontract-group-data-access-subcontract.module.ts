import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromSubcontract from './+state/subcontract.reducer';
import { SubcontractEffects } from './+state/subcontract.effects';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromSubcontract.SUBCONTRACT_FEATURE_KEY,
      fromSubcontract.reducer
    ),
    EffectsModule.forFeature([SubcontractEffects]),
  ],
})
export class SharedSubcontractGroupDataAccessSubcontractModule {}
