import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/angular';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { Project } from '@workspace/shared/data-access-models';

import * as ProjectActions from './project.actions';
import * as ProjectFeature from './project.reducer';
import { ProjectService } from './project.service';
import { map } from 'rxjs/operators';

@Injectable()
export class ProjectEffects {
  init$ = createEffect(() =>
    this.dataPersistence.fetch(ProjectActions.init, {
      run: (
        action: ReturnType<typeof ProjectActions.init>,
        state: ProjectFeature.ProjectPartialState
      ) => {
        // Your custom service 'load' logic goes here. For now just return a success action...
        return this.projectService
          .getProjectList()
          .pipe(
            map((projects: Project[]) =>
              ProjectActions.loadProjectListSuccess({ projects })
            )
          );
      },
      onError: (action: ReturnType<typeof ProjectActions.init>, error) => {
        console.error('Error', error);
        return ProjectActions.loadProjectFailure({ error });
      },
    })
  );

  updateProject$ = createEffect(() =>
    this.dataPersistence.pessimisticUpdate(ProjectActions.updateProject, {
      run: (a: ReturnType<typeof ProjectActions.updateProject>, state) => {
        // console-log('SUBCONTRACT ITEM EFFECTS - create new subcontract item');
        // convert return promise to observable
        return this.projectService.updateProject(a.project).pipe(
          map((project: Project) => {
            return ProjectActions.updateProjectSuccess({ project });
          })
        );
      },
      onError: (action, error) => {
        console.error('Error', error);
        return ProjectActions.updateProjectFailure({ error });
      },
    })
  );

  constructor(
    private readonly actions$: Actions,
    private readonly dataPersistence: DataPersistence<ProjectFeature.ProjectPartialState>,
    private projectService: ProjectService
  ) {}
}
