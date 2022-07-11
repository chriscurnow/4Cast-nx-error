import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as ProjectActions from './project.actions';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { Project } from '@workspace/shared/data-access-models';
// import { ProjectEntity as Project } from './project.models';

export const PROJECT_FEATURE_KEY = 'project';

export interface ProjectEntityState extends EntityState<Project> {
  selectedId?: string | number; // which Project record has been selected
  loaded: boolean; // has the Project list been loaded
  error?: string | null; // last known error (if any)
}

export function sortByName(a: Project, b: Project): number {
  if (a.name && b.name) {
    return a.name.localeCompare(b.name);
  } else {
    return 0;
  }
}

export interface ProjectPartialState {
  readonly [PROJECT_FEATURE_KEY]: ProjectEntityState;
}

export const projectAdapter: EntityAdapter<Project> =
  createEntityAdapter<Project>({
    sortComparer: sortByName,
  });

export const initialState: ProjectEntityState = projectAdapter.getInitialState({
  // set initial required properties
  selectedId: '',
  loaded: false,
  error: null,
});

const projectReducer = createReducer(
  initialState,
  on(ProjectActions.init, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(ProjectActions.loadProjectSuccess, (state, { project }) =>
    projectAdapter.setOne(project, { ...state, loaded: true })
  ),
  on(ProjectActions.loadProjectFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(ProjectActions.loadProjectList, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(ProjectActions.loadProjectListSuccess, (state, { projects }) =>
    projectAdapter.setAll(projects, { ...state, loaded: true })
  ),
  on(ProjectActions.loadProjectListFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(ProjectActions.updateProject, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(ProjectActions.updateProjectSuccess, (state, { project }) =>
    projectAdapter.setOne(project, { ...state, loaded: true })
  ),
  on(ProjectActions.updateProjectFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function reducer(state: ProjectEntityState | undefined, action: Action) {
  return projectReducer(state, action);
}
