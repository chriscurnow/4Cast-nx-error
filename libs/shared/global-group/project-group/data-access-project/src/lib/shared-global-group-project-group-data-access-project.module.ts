import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromProject from './+state/project.reducer';
import { ProjectEffects } from './+state/project.effects';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromProject.PROJECT_FEATURE_KEY,
      fromProject.reducer
    ),
    EffectsModule.forFeature([ProjectEffects]),
  ],
})
export class SharedGlobalGroupProjectGroupDataAccessProjectModule {}
