import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProjectDetailContainerComponent } from './project-detail/project-detail-container/project-detail-container.component';
import { ProjectListContainerComponent } from './project-list/project-list-container/project-list-container.component';
import { SharedGlobalProjectDataAccessProjectModule } from '@workspace/shared-global-project-data-access-project';

@NgModule({
  imports: [
    CommonModule,
    SharedGlobalProjectDataAccessProjectModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', redirectTo: 'list' },
      { path: 'list', component: ProjectListContainerComponent },
      { path: 'detail/:projectId', component: ProjectDetailContainerComponent },
    ]),
  ],
})
export class SharedGlobalProjectFeatureProjectModule {}
