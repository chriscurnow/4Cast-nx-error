import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  PROJECT_FEATURE_KEY,
  ProjectEntityState,
  projectAdapter,
} from './project.reducer';
import { selectRouteParams } from './project.router.selectors';

// Lookup the 'Project' feature state managed by NgRx
export const getProjectState =
  createFeatureSelector<ProjectEntityState>(PROJECT_FEATURE_KEY);

const { selectAll, selectEntities } = projectAdapter.getSelectors();

export const getProjectLoaded = createSelector(
  getProjectState,
  (state: ProjectEntityState) => state.loaded
);

export const getProjectError = createSelector(
  getProjectState,
  (state: ProjectEntityState) => state.error
);

export const getAllProjects = createSelector(
  getProjectState,
  (state: ProjectEntityState) => selectAll(state)
);

export const getProjectEntities = createSelector(
  getProjectState,
  (state: ProjectEntityState) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getProjectState,
  (state: ProjectEntityState) => state.selectedId
);

export const getSelectedProject = createSelector(
  getProjectEntities,
  selectRouteParams,
  (entities, { projectId }) => (projectId ? entities[projectId] : undefined)
);

export const getUpdated = createSelector(
  getProjectState,
  (state: ProjectEntityState) => state.updated
);
