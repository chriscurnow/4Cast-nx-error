import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedUiMainLayoutModule } from '@workspace/shared/ui-main-layout';
import { SharedUiDefaultModuleCollectionModule } from '@workspace/shared-ui-default-module-collection';

import { LoginComponent } from './login/login.component';
import { LoginFormComponent } from './login-form/login-form.component';

@NgModule({
  declarations: [LoginComponent, LoginFormComponent],
  imports: [
    // vendor
    CommonModule,

    // libs
    SharedUiDefaultModuleCollectionModule,
    SharedUiMainLayoutModule,

    // routing
    RouterModule.forChild([
      {
        path: '',
        component: LoginComponent,
        children: [
          {
            path: '',
            redirectTo: 'login-form',
            pathMatch: 'full',
          },
          {
            path: 'login-form',
            component: LoginFormComponent,
          },
        ],
      },
    ]),
  ],
})
export class SharedFeatureLoginModule {}
