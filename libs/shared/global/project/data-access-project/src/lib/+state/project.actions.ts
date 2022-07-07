import { createAction, props } from '@ngrx/store';
import { ProjectEntity } from './project.models';

export const init = createAction('[Project Page] Init');

export const loadProjectSuccess = createAction(
  '[Project/API] Load Project Success',
  props<{ project: ProjectEntity[] }>()
);

export const loadProjectFailure = createAction(
  '[Project/API] Load Project Failure',
  props<{ error: any }>()
);
