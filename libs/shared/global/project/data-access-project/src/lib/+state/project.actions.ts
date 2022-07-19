import { createAction, props } from '@ngrx/store';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { Project } from '@workspace/shared/data-access-models';
export const init = createAction('[Project Page] Init');

export const loadProject = createAction(
  '[Project/API] load Project',
  props<{ projectId: string}>()

);

export const loadProjectSuccess = createAction(
  '[Project/API] Load Project Success',
  props<{ project: Project }>()
);

export const loadProjectFailure = createAction(
  '[Project/API] Load Project Failure',
  props<{ error: any }>()
);


export const loadProjectList = createAction(
  '[Project/API] load Project List'
);

export const loadProjectListSuccess = createAction(
  '[Project/API] Load Project List Success',
  props<{ projects: Project[] }>()
);

export const loadProjectListFailure = createAction(
  '[Project/API] Load Project List Failure',
  props<{ error: any }>()
);

export const updateProject = createAction(
  '[Project/API] Update Project',
  props<{ project: Project}>()
);

export const updateProjectSuccess = createAction(
  '[Project/API] Update Project SUCCESS',
  props<{ project: Project}>()
);

export const updateProjectFailure = createAction(
  '[Project/API] Update Project Failure',
  props<{ error: any }>()
);



