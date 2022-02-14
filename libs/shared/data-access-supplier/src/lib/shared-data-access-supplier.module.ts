import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromSupplier from './+state/supplier.reducer';
import { SupplierEffects } from './+state/supplier.effects';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromSupplier.SUPPLIER_FEATURE_KEY,
      fromSupplier.reducer
    ),
    EffectsModule.forFeature([SupplierEffects]),
  ],
})
export class SharedDataAccessSupplierModule {}
