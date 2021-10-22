import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedUiDefaultModuleCollectionModule } from '@workspace/shared-ui-default-module-collection';

import { ToolbarUserComponent } from './toolbar-user/toolbar-user.component';

@NgModule({
  imports: [CommonModule, SharedUiDefaultModuleCollectionModule],
  declarations: [ToolbarUserComponent],
  exports: [ToolbarUserComponent],
})
export class SharedFeatureToolbarUserModule {}
