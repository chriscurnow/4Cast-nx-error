import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
@NgModule({
  imports: [CommonModule, RouterModule, MatToolbarModule],
  exports: [MatToolbarModule],
})
export class SharedSubcontractGroupUiSubDetailModule {}
