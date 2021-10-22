import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// material
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

const STANDARD_MATERIAL_COLLECTION = [
  // collection of lightweight material modules which are used by most apps
  MatCardModule,
  MatIconModule,
  MatMenuModule,
  MatInputModule,
  MatButtonModule,
  MatFormFieldModule,
];

@NgModule({
  imports: [
    // vendor
    CommonModule,
    RouterModule,
    ReactiveFormsModule,

    // material
    ...STANDARD_MATERIAL_COLLECTION,
  ],
  exports: [
    // vendor
    CommonModule,
    RouterModule,
    ReactiveFormsModule,

    // material
    ...STANDARD_MATERIAL_COLLECTION,
  ],
})
export class SharedUiDefaultModuleCollectionModule {}
