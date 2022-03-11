import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromSubcontractItem from '../../../data-access-subcontract-items/src/lib/+state/subcontract-item.reducer';
import { SubcontractItemEffects } from '../../../data-access-subcontract-items/src/lib/+state/subcontract-item.effects';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromSubcontractItem.SUBCONTRACT_ITEM_FEATURE_KEY,
      fromSubcontractItem.reducer
    ),
    EffectsModule.forFeature([SubcontractItemEffects]),
    StoreModule.forFeature(
      fromSubcontractItem.SUBCONTRACT_ITEM_FEATURE_KEY,
      fromSubcontractItem.reducer
    ),
  ],
})
export class SharedSubcontractItemsModule {}
