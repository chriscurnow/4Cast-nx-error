import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/angular';

import * as ProjectActions from './project.actions';
import * as ProjectFeature from './project.reducer';

@Injectable()
export class ProjectEffects {
  init$ = createEffect(() =>
    this.dataPersistence.fetch(ProjectActions.init, {
      run: (
        action: ReturnType<typeof ProjectActions.init>,
        state: ProjectFeature.ProjectPartialState
      ) => {
        // Your custom service 'load' logic goes here. For now just return a success action...
        return ProjectActions.loadProjectSuccess({ project: [] });
      },
      onError: (action: ReturnType<typeof ProjectActions.init>, error) => {
        console.error('Error', error);
        return ProjectActions.loadProjectFailure({ error });
      },
    })
  );

  constructor(
    private readonly actions$: Actions,
    private readonly dataPersistence: DataPersistence<ProjectFeature.ProjectPartialState>
  ) {}
}
