import { createAction, props } from '@ngrx/store';
import { NavigationEntity } from './navigation.models';

export const init = createAction('[Navigation Page] Init');

export const loadNavigationSuccess = createAction(
  '[Navigation/API] Load Navigation Success',
  props<{ navigation: NavigationEntity[] }>()
);

export const loadNavigationFailure = createAction(
  '[Navigation/API] Load Navigation Failure',
  props<{ error: any }>()
);

export const addEntity = createAction('[Navigation] Add Entity');
export const addEntitySuccess = createAction('[Navigation] Add Entity Success');
export const addEntityFailure = createAction(
  '[Navigation] Add Entity Failure',
  props<{ error: any }>()
  );
export const hideAddButton = createAction('[Navigation] Hide Add Button');
export const showAddButton = createAction('[Navigation] Show Add Button');
